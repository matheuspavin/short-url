const { userModel } = require('./userModel');
const Boom = require('boom');

exports.create = async ({ id }) => {
	const _user = await userModel.findById(id);

	if (_user)
		throw Boom.conflict(`Já existe um usuário cadastrado com o id: ${id}`);

	const user = new userModel({ _id: id });
	return user.save();
};
