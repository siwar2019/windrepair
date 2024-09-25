
import { useParams } from "react-router-dom";
import FundDetailsView from "../../components/fund/view/fund-details-view"

const DetailsFundPage = () => {
    const { id } = useParams();

    return <FundDetailsView id={id!}/>
}
export default DetailsFundPage
