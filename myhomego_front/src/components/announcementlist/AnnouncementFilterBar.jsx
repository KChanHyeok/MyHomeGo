import React, { useState } from 'react';
import { getLhAnnouncements } from './api';

function AnnouncementFilterBar(props) {
  const { onFilter } = props;
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    status: '',
    dateType: '',
    startDate: '',
    endDate: '',
    title: ''
  });

  const handleFilter = () => {
    // 날짜 타입이 선택되지 않았으면 날짜 필터는 제거
    const filteredValues = {
      ...filters,
      startDate: filters.dateType ? filters.startDate : '',
      endDate: filters.dateType ? filters.endDate : ''
    };
    onFilter(filteredValues);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow">
      <select 
        className="border px-2 py-1" 
        value={filters.type} 
        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
      >
        <option value="">공고유형</option>
        <option value="매입임대">매입임대</option>
        <option value="전세임대">전세임대</option>
        <option value="행복주택">행복주택</option>
        <option value="행복주택(신혼희망)">행복주택(신혼희망)</option>
        <option value="통합공공임대(신혼희망)">통합공공임대(신혼희망)</option>
      </select>
      <select 
        className="border px-2 py-1" 
        value={filters.region} 
        onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
      >
        <option value="">공고지역</option>
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
      </select>
      <select 
        className="border px-2 py-1" 
        value={filters.status} 
        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
      >
        <option value="">공고상태</option>
        <option value="공고중">공고중</option>
        <option value="접수중">접수중</option>
      </select>
      <select 
        className="border px-2 py-1" 
        value={filters.dateType} 
        onChange={(e) => setFilters(prev => ({ ...prev, dateType: e.target.value }))}
      >
        <option value="">게시/마감 선택</option>
        <option value="게시일">게시일</option>
        <option value="마감일">마감일</option>
      </select>
      <div className="flex gap-2">
        <input 
          type="date" 
          className={`border px-2 py-1 ${filters.dateType ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          value={filters.startDate} 
          onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          disabled={!filters.dateType}
        />
        <span>~</span>
        <input 
          type="date" 
          className={`border px-2 py-1 ${filters.dateType ? '' : 'bg-gray-100 cursor-not-allowed'}`}
          value={filters.endDate} 
          onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          disabled={!filters.dateType}
        />
      </div>
      <input 
        type="text" 
        placeholder="공고명" 
        className="border px-2 py-1 flex-grow" 
        value={filters.title} 
        onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
      />
      <button 
        className="bg-[#EFFFF8] text-black px-4 py-1 rounded hover:bg-[#5DC1B7] cursor-pointer"
        onClick={handleFilter}
      >
        조회
      </button>
    </div>
  );
}

export default AnnouncementFilterBar;