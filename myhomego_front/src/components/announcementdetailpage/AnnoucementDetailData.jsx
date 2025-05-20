import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import useAnnouncementDetail from './useAnnouncementDetail';
import useAnnoucementSpl from './useAnnoucementSpl';
import AnnouncementDetailTable from './AnnouncementDetailTable';
import './AnnoucementDetail.css';

function AnnouncementDetailData() {
  const { panId } = useParams();
  const location = useLocation();
  const params = location.state || {};
console.log('params:', params);
  // ✅ 반드시 use 붙여서 훅 호출!
  const { detail, loading: loadingDetail } = useAnnouncementDetail(panId, params);
  const { spl, loading: loadingSpl } = useAnnoucementSpl(panId, params);

  if (loadingDetail || loadingSpl) return <div>로딩 중...</div>;
  if (!detail && !spl) return <div>상세 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <Link to="/Announcementlist" className="text-blue-500 underline mb-4 inline-block">← 목록으로 돌아가기</Link>
      <h2 className="text-2xl font-bold mb-4">공고 상세</h2>
      <AnnouncementDetailTable detail={detail} spl={spl} />
    </div>
  );
}

export default AnnouncementDetailData;
