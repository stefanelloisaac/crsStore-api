import autorRoute from './autorRoute';
import categoriasRoute from './categoriasRoute'
import livroRoute from './livroRoute';
import usuarioRoute from './usuarioRoute';


function Routes(app){
    categoriasRoute(app);
    autorRoute(app);
    usuarioRoute(app);
    livroRoute(app);
}

export default Routes