import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = '6NyqkFLFWxC9mkkEU6ntshrtBhh+77ivcPNYzUql7auzUuyQJAX1p8a8avnSHv4ElqjrpsqQkQOuFfmInwyF5A==';

export default function useAnnouncementSpl(panId, params) {
  const [spl, setSpl] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('useAnnouncementSpl에서 panId:', panId);
  useEffect(() => {
    async function fetchSpl() {
      setLoading(true);
      try {
        const res = await axios.get(
          'http://apis.data.go.kr/B552555/lhLeaseNoticeSplInfo1/getLeaseNoticeSplInfo1',
          {
            params: {
              serviceKey: API_KEY,
              PAN_ID: panId,
              SPL_INF_TP_CD,
              CCR_CNNT_SYS_DS_CD,
              UPP_AIS_TP_CD
            }
          }
        );
        setSpl({
          PAN_ID: res.data?.dsSch?.[0]?.PAN_ID,
          dsList02: res.data[0]?.dsList02 || [],
        });
      } catch (e) {
        setSpl(null);
      } finally {
        setLoading(false);
      }
    }

    if (panId) fetchSpl();

  }, [panId, params]);

  return { spl, loading };
}