import spinner from "../../assets/spinner.svg";

const Spinner = ({message = ""}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "transparent"
      }}
    >
      <img
        src={spinner}
        alt="Loading..."
        className="spinner"
      />
      <p>{message}</p>
    </div>
  );
};
export default Spinner;
