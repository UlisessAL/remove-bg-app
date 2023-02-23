import { Link } from "react-router-dom";

const RecommendedCard = (props) => {
  const { effect, info, funct } = props.effect;

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://res.cloudinary.com/demo/image/upload/w_700,h_530,c_scale/w_200,f_auto,q_auto/balloons.jpg"
            alt="Shoes"
            className="w-full"
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
