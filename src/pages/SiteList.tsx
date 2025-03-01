import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSites } from "../entities/api/sitesSlice";
import { RootState, AppDispatch } from "../entities/store/store";

const SitesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();


  const sites = useSelector((state: RootState) => state.sites.sites);
  const status = useSelector((state: RootState) => state.sites.status);
  const error = useSelector((state: RootState) => state.sites.error);

  useEffect(() => {
    dispatch(fetchSites()); 
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log(sites);
    }
  }, [sites, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Sites</h1>
      <ul>
        {sites.map((site) => (
          <li key={site.id}>{site.url}</li> 
        ))}
      </ul>
    </div>
  );
};

export default SitesList;
