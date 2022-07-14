import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import Autor from "./Autor";
import Categoria from "./Categoria";


const Livro = sequelize.define(
    'livros',
    {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        titulo: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        sinopse: {
            type: DataTypes.STRING(500),
        },
        emprestado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    
    {
        freezeTableName: true,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
    },
    
    
)
    
    Livro.belongsTo(Categoria, {foreignKey: "id_categoria"})
    Livro.belongsTo(Autor, {foreignKey: "id_autor"})

export default Livro;