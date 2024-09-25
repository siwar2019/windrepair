import { useQuery } from "@tanstack/react-query";
import { requestGetTicketDetails } from "../../controllers/ticket/ticket.api";
import { TTicket } from "../../interfaces/props/ticket";
import { useGenericMutation } from "../../utils/react-query";

export const useGetTicket = (payload: TTicket) => {
    return useQuery({
        queryKey: ["ticket"],
        queryFn: () => requestGetTicketDetails(payload),

    });
};



