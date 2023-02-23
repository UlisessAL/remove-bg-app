import { useCloudinaryContext } from "../../context/cloudinaryContext";
import "../../scss/RecommendedSection.scss";
import RecommendedCard from "./RecommendedCard/RecommendedCard";

const RecommendedSection = () => {


  const {effects} = useCloudinaryContext();


  return (
    <section className="section-recommended">
      <h2 className="title-recommend">Looking for something else?</h2>
      <p className="p-recommend">Recommended effects:</p>
      <div className="recommed-container">
        {effects.map((effect) =>  <RecommendedCard effect={effect} key={effect.id}/>
        )}
      </div>
    </section>
  )
}
export default RecommendedSection