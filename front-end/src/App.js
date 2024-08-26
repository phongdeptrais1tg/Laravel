import axios from "axios";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Products from "./products/products";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
const App = () => {
    return (
        <BrowserRouter>
        

        <Routes>
                
                
                
                <Route path="/" > 
                    
                    <Route index element={<Products />} /> 
                    
                    
                </Route>


                
            </Routes>
        
            
        </BrowserRouter>
    );
}

export default App;