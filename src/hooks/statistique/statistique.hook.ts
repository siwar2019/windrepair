import { useQuery } from "@tanstack/react-query"
import { requestGetStatistique } from "../../controllers/statistique/statistique.api"

export const useStatistique = (period: string) => {
    return useQuery({
        queryKey: ['statistique', period],
        queryFn: () => requestGetStatistique(period),
    });
};