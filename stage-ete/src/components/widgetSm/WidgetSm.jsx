import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://img.freepik.com/photos-premium/je-suis-femme-portrait-femme-fond-gris-visage-fille-carriere-professionnel-affaires-ambitieux-serieux_545934-4293.jpg?w=2000"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Alice</span>
            <span className="widgetSmUserTitle">PRODUCTEUR</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        
        <li className="widgetSmListItem">
          <img
            src="https://img.freepik.com/photos-gratuite/portrait-jeune-homme-expressif-portant-costume-formel_273609-6943.jpg?w=360"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Raphael</span>
            <span className="widgetSmUserTitle">PRODUCTEUR</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8yM-wgdvsfTfKwu4q4JnBnf7Ao3ZMWfeKCDv8oTUSTUbJD77XII9WP63xarHem9VOivY&usqp=CAU"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna </span>
            <span className="widgetSmUserTitle">PRODUCTEUR</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtPIQOFyK0NQty-HIYd8OkzPqzbSbNJUPhxRzkQEgWmgQNGHZ25uaNVeTxxrU0rjKU7YQ&usqp=CAU"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Peter</span>
            <span className="widgetSmUserTitle">PRODUCTEUR</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
