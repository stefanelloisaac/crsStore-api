// import Usuario from "./Usuario";
import Categoria from "./Categoria"
import Autor from "./Autor";
import Usuario from "./Usuario";
import Livro from "./Livro";


(async () => {
  await Usuario.sync({ force: true });
  await Categoria.sync({ force: true});
  await Autor.sync({ force: true });
  await Usuario.sync({ force: true });
  
  await Livro.sync({force:true})

})()