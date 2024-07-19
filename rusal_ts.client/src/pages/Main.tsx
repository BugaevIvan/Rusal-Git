import logo from "../img/rusal.png";
import Table from "../components/UI/table/Table";
import Dropdown from "../components/UI/dropdown/Dropdown";
import PassFilter from "../components/UI/PassFilter";
import "../css/Main.scss";

const Main = () => {
    return (
        <div id="center-main">
            <div id="title">
                <div id="left-title">
                    <img src={logo} alt="rusal" width="45" height="50" />
                    <div id="title-content">Эл. Проходная</div>
                </div>
                <Dropdown />
            </div>
            <PassFilter />
            <div id="data-container">
                <Table />
            </div>
        </div>
    );
};

export default Main;
