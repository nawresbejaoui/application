import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://img.freepik.com/photos-gratuite/portrait-homme-blanc-isole_53876-40306.jpg?w=2000"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Martin</span>
          </td>
          <td className="widgetLgDate">2 Jun 2022</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://us.123rf.com/450wm/deagreez/deagreez1602/deagreez160200418/52410197-portrait-de-s%C3%A9rieux-homme-intelligent-dans-les-verres.jpg?ver=6"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Léo</span>
          </td>
          <td className="widgetLgDate">4 Fév 2022</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://davidferriere.com/wp-content/uploads/2016/02/20160212-Portrait-Feminin-Rennes.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Patricia</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://www.sylvain-renard.com/wp-content/uploads/2016/12/MARTIN-Fabienne-13.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Susan </span>
          </td>
          <td className="widgetLgDate">4 Jun 2022</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
