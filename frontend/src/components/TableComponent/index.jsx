import React from "react";
import styles from "./Table.module.css";

const TableComponent = ({ userEventRequests }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Event name </th>
          <th>City</th>
          <th>Game Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {userEventRequests?.map((request) => (
          <tr key={request.event_id._id}>
            <td data-label={"Event name"}>{request.event_id.event_name}</td>
            <td data-label={"City"}>{request.event_id.city}</td>
            <td data-label={"Game Type"}>{request.event_id.type_of_game}</td>
            <td data-label={"Status"}>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
