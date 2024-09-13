import { useQuery } from "@tanstack/react-query";
import { https } from "../../functions/axios";

const getAllApplicantsPath = (generation: string) =>
  `/page/1/year/${generation}/pass-states?order=state`;

const getAllApplicantsWithPassState = async (generation: string) => {
  const { data } = await https.get(getAllApplicantsPath(generation));
  return data;
};

interface useAllApplicantsWithPassStateParams {
  generation: string;
}
export const useAllApplicantsWithPassState = ({
  generation,
}: useAllApplicantsWithPassStateParams) => {
  return useQuery([getAllApplicantsPath(generation)], () =>
    getAllApplicantsWithPassState(generation)
  );
};
