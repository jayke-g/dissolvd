import "./App.css";
import Body from "./components/Body";
import { HashRouter } from "react-router-dom";

function App() {

    return (
    <>
        <div className="welcome-mobile">
            <div>
           <strong> Welcome to Dissolvd! </strong>
            </div>
            <div>
                <i>
                Mobile version isn't ready yet but it will be soon.
                Please check out the desktop version
                </i>
            </div>
            <div>
                Dissolvdへようこそ 
                モバイル版はまだ準備ができていませんので、 デスクトップ版をご利用してください。
            </div>
            <div>
                La version mobile de notre application mobile n'est disponible pour le moment.
                Veuillez consulter la version pour ordinateur.
            </div>
        </div>
        <div className="main-desktop">
            <HashRouter>
                    <Body />
            </HashRouter>
        </div>
    </>
    );
}

export default App;
