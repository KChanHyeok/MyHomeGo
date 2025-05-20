import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AnnouncementDetailTable from '../components/AnnouncementDetailTable';
import '../style/AnnoucementDetail.css';

const API_KEY = '6NyqkFLFWxC9mkkEU6ntshrtBhh+77ivcPNYzUql7auzUuyQJAX1p8a8avnSHv4ElqjrpsqQkQOuFfmInwyF5A==';

function AnnouncementDetail() {
  const { panId } = useParams();
  const location = useLocation();
  const {
    SPL_INF_TP_CD,
    CCR_CNNT_SYS_DS_CD,
    UPP_AIS_TP_CD
  } = location.state || {};
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await axios.get(
          'http://apis.data.go.kr/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1',
          {
            params: {
              serviceKey: API_KEY,
              PAN_ID: panId,
              SPL_INF_TP_CD,
              CCR_CNNT_SYS_DS_CD,
              UPP_AIS_TP_CD
            },
          }
        );
        // LH 상세 API 응답 구조에 맞게 데이터 추출
        const detailData = {
          PAN_ID: res.data[0]?.dsSch?.[0]?.PAN_ID,
          dsCtrtPlc: res.data[1]?.dsCtrtPlc || [],
          dsSplScdl: res.data[1]?.dsSplScdl || [],
          dsEtcInfo: res.data[1]?.dsEtcInfo || [],
          dsAhflInfo: res.data[1]?.dsAhflInfo || [],
          dsSplScdl: res.data[1]?.dsSplScdl || [],
          dsSbdAhfl: res.data[1]?.dsSbdAhfl || [],
          dsSbd: res.data[1]?.dsSbd || [],
          dsCtrtPlc: res.data[1]?.dsCtrtPlc || [],
        };
        setDetail(detailData);
      } catch (e) {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [panId, SPL_INF_TP_CD, CCR_CNNT_SYS_DS_CD, UPP_AIS_TP_CD]);
  
  if (loading) return <div>로딩 중...</div>;
  if (!detail) return <div>상세 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">← 목록으로 돌아가기</Link>
      <h2 className="text-2xl font-bold mb-4">공고 상세</h2>
      <AnnouncementDetailTable detail={detail} />
    </div>
  );
}

export default AnnouncementDetail;
