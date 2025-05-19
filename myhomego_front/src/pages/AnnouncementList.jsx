import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AnnouncementFilterBar from '../components/AnnouncementFilterBar';
import AnnouncementTable from '../components/AnnouncementTable';
import axios from 'axios';
import { getLhAnnouncements } from '../services/api';

// LH API 키 (실제 사용 시 환경 변수로 관리하는 것을 추천)
const API_KEY = '6NyqkFLFWxC9mkkEU6ntshrtBhh+77ivcPNYzUql7auzUuyQJAX1p8a8avnSHv4ElqjrpsqQkQOuFfmInwyF5A==';

// 필터링 값 타입 정의
const FilterValues = {
  title: String,      // 공고명 검색어
  status: String,     // 상태 필터
  region: String,     // 지역 필터
  type: String,       // 유형 필터
  dateType: String,   // 날짜 타입 (게시일/마감일)
  startDate: String,  // 시작 날짜
  endDate: String     // 종료 날짜
};

const AnnouncementList = () => {
  // 상태 관리
  const [announcements, setAnnouncements] = useState([]); // 공고 데이터
  const [loading, setLoading] = useState(true);                           // 로딩 상태
  const [error, setError] = useState('');                                // 에러 메시지
  const [filters, setFilters] = useState({                  // 필터 상태
    region: '',
    status: '',
    dateType: '',
    startDate: '',
    endDate: '',
    title: ''
  });
  const [currentPage, setCurrentPage] = useState(1);                      // 현재 페이지
  const itemsPerPage = 10;                                               // 페이지당 아이템 수

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 생성
  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 공고 데이터 가져오기
  const fetchAnnouncements = async (filters) => {
    try {
      // 기본 검색어 설정 (청년/신혼 공고)
      const baseTitle = '청년,신혼';
      const searchTitle = filters && filters.title ? filters.title : baseTitle;

      // 날짜 필터링 파라미터 설정
      const dateParams = filters && filters.dateType ? {
        [(filters.dateType === '게시일' ? 'PAN_DT' : 'PAN_END_DT')]: {
          $gte: filters.startDate,
          $lte: filters.endDate
        }
      } : {};

      // 청년/신혼 공고를 별도로 API 호출
      const responses = await Promise.all([
        axios.get(
          'http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1',
          {
            params: {
              serviceKey: API_KEY,
              PG_SZ: 100,
              PAGE: 1,
              PAN_NM: searchTitle.includes('청년') ? '청년' : ''
            }
          }
        ),
        axios.get(
          'http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1',
          {
            params: {
              serviceKey: API_KEY,
              PG_SZ: 100,
              PAGE: 1,
              PAN_NM: searchTitle.includes('신혼') ? '신혼' : ''
            }
          }
        )
      ]);

      // 모든 응답 데이터 합치기
      const allData = [
        ...(responses[0].data[1].dsList || []),
        ...(responses[1].data[1].dsList || [])
      ];

      // 클라이언트 측 필터링
      const filteredData = allData.filter((item) => {
        // 각 필터 조건 체크
        const matchesRegion = !filters || !filters.region || item.CNP_CD_NM.includes(filters.region);
        const matchesStatus = !filters || !filters.status || item.PAN_SS.includes(filters.status);
        const matchesTitle = !filters || !filters.title || item.PAN_NM.toLowerCase().includes(filters.title.toLowerCase());
        
        // 기본 상태에서는 모든 데이터 표시
        if (!filters || !filters.dateType && !filters.region && !filters.status && !filters.title) {
          return true;
        }

        // 날짜 필터링
        if (filters && filters.dateType) {
          const targetDate = filters.dateType === '게시일' ? item.PAN_NT_ST_DT : item.CLSG_DT;
          
          // 날짜가 없을 경우 필터링 통과
          if (!targetDate) return true;
          
          // 날짜 형식 변환 함수
          const formatDate = (date) => {
            if (!date) return new Date('1970-01-01');
            
            // YYYY-MM-DD 형식을 그대로 사용
            if (date.includes('-')) return new Date(date);
            
            // YYYYMMDD 형식을 YYYY-MM-DD로 변환
            const year = date.slice(0, 4);
            const month = date.slice(4, 6);
            const day = date.slice(6, 8);
            return new Date(`${year}-${month}-${day}`);
          };

          const target = formatDate(targetDate);
          const startDate = formatDate(filters.startDate || '');
          const endDate = formatDate(filters.endDate || '');
          
          return matchesRegion && matchesStatus && matchesTitle && 
            target >= startDate && target <= endDate;
        }

        return matchesRegion && matchesStatus && matchesTitle;
      });

      // 필터링된 데이터 변환하여 저장
      setAnnouncements(
        filteredData.map((item) => ({
          PAN_NM: item.PAN_NM,          // 공고명
          PAN_NT_ST_DT: item.PAN_NT_ST_DT, // 공고일
          CLSG_DT: item.CLSG_DT,        // 마감일
          CNP_CD_NM: item.CNP_CD_NM,    // 지역명
          AIS_TP_CD_NM: item.AIS_TP_CD_NM, // 유형명
          DTL_URL: item.DTL_URL,        // 상세링크
          PAN_SS: item.PAN_SS           // 상태
        }))
      );
    } catch (err) {
      setError('공고 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 공고 데이터 로드
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">청약 공고 모음</h1>
      <AnnouncementFilterBar onFilter={fetchAnnouncements} />
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* 현재 페이지의 공고 데이터 표시 */}
          <AnnouncementTable announcements={currentItems} />
          
          {/* 페이지네이션 */}
          <div className="mt-4 flex justify-center">
            <nav className="flex items-center justify-center">
              {/* 이전 페이지 버튼 */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                이전
              </button>
              
              {/* 페이지 번호 버튼 */}
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === number
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {/* 다음 페이지 버튼 */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                다음
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementList;