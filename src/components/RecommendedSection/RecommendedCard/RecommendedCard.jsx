import { Link } from "react-router-dom";

const RecommendedCard = (props) => {
  const { effect, info, funct, image } = props.effect;

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl" style={{minHeight:"600px"}}>
        <figure>
          <img
            src={image}
            alt={funct}
            className="w-full h-64"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {effect}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{info}</p>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" to={`/effect/${funct}`}>See more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecommendedCard;
