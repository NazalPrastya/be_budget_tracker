const { Op } = require("sequelize");
const { Transaction, User, Category } = require("../../store/sequelize");

const NotFound = require("../../errors/NotFoundError");
const BadRequestError = require("../../errors/BadRequestError");

class TransactionService {
  async getAllByUser(userId, page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;
    const whereClause = {
      user_id: userId,
    };

    if (search) {
      whereClause[Op.or] = [
        { note: { [Op.like]: `%${search}%` } },
        { amount: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: "category",
          attribute: ["name", "description"],
          required: false,
        },
        {
          model: User,
          as: "user",
          attribute: ["name", "email"],
          required: false,
        },
      ],
      order: [["date", "DESC"]],
      limit,
      offset,
      distict: true,
    });

    return {
      data: rows,
      pagination: {
        total: count,
        limit,
        page,
        totalPage: Math.ceil(count / limit),
      },
    };
  }

  async getById(id) {
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attribute: ["name", "description"],
          required: false,
        },
        {
          model: User,
          as: "user",
          attribute: ["name", "email"],
          required: false,
        },
      ],
    });

    if (!transaction) throw new NotFound("Data Transaksi tidak ditemukan!");
    return transaction;
  }

  async create(data) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await Transaction.findAll({
      where: {
        user_id: data.user_id,
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      const amount = parseInt(tx.amount);

      if (tx.type === "income") totalIncome += amount;
      if (tx.type === "expense") totalExpense += amount;
    }

    const amountToAdd = parseInt(data.amount);
    if (data.type === "expenses" && totalIncome < amountToAdd) {
      throw new BadRequestError("Saldo tidak mencukupi");
    }

    const newTransaction = await Transaction.create(data);
    return newTransaction;
  }
  async update(id, data) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transaction = await Transaction.findAll({
      where: {
        user_id: data.user_id,
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transaction) {
      const amount = parseInt(tx.amount);

      if (tx.type === "income") totalIncome += amount;
      if (tx.type === "expense") totalExpense += amount;
    }

    const amountToAdd = parseInt(data.amount);
    if (data.type === "expenses" && totalIncome < amountToAdd) {
      throw new BadRequestError("Saldo tidak mencukupi");
    }

    const newTransaction = await Transaction.update(data, { where: { id } });
    return newTransaction;
  }

  async delete(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new NotFound("Data Transaksi tidak ditemukan!");
    await transaction.destroy();
    return true;
  }
}

module.exports = new TransactionService();
