import React from 'react';
import '../style/AnnoucementDetail.css';

// 날짜 포맷팅 함수 (YYYYMMDD → YYYY년 MM월 DD일)

function AnnouncementDetailTable({ detail }) {
  // API 응답 구조에 맞춘 데이터 추출
  console.log(detail);
  const ctrtPlc = detail?.dsCtrtPlc?.[0] || {}; // 주의: API에 따라 dsCtrtPlcNm이 아닐 수 있음
  const scdl = detail?.dsSplScdl?.[0] || {}; // 주의: API에 따라 dsSplScdlNm이 아닐 수 있음

  return (
    <div className="detail-table-wrap">
      <h2 className="detail-table-title">공고 상세정보</h2>

      {/* 기본 정보 섹션 */}
      <div className="detail-section">
        <div className="detail-row">
          <div className="detail-label">공고명</div>
          <div className="detail-content">{detail?.PAN_NM || '-'}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">공고번호</div>
          <div className="detail-content">{detail?.PAN_ID || '-'}</div>
        </div>
      </div>

      {/* 서류접수기간 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">접수 일정</h3>
        <div className="detail-grid-3">
          <div className="detail-row">
            <div className="detail-label">접수기간 시작일</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.SBSC_ACP_ST_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">접수기간 종료일</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.SBSC_ACP_CLSG_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류대상자 발표일</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.PPR_SBM_OPE_ANC_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류접수 시작일</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.PPR_ACP_ST_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류접수 종료일</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.PPR_ACP_CLSG_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">당첨자 발표</div>
            <div className="detail-content">{detail?.dsSplScdl?.[0]?.PZWR_ANC_DT || '-'}</div>
          </div>
        </div>
      </div>

      {/* 운영기간 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">운영 기간</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">시작일</div>
            <div className="detail-content">{detail?.dsCtrtPlc?.[0]?.TSK_ST_DTTM || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">종료일</div>
            <div className="detail-content">{detail?.dsCtrtPlc?.[0]?.TSK_ED_DTTM || '-'}</div>
          </div>
        </div>
      </div>

      {/* 접수처 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">접수처 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">주소</div>
            <div className="detail-content">{detail?.dsSbdDongAhfl?.[0]?.CTRT_PLC_ADR || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">전화번호</div>
            <div className="detail-content">{detail?.dsCtrtPlc?.[0]?.SIL_OFC_TLNO || '-'}</div>
          </div>
        </div>
      </div>
        {/* 접수처 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">단지 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">단지</div>
            <div className="detail-content">{detail?.dsSbd?.[0]?.BZDT_NM || '-'}</div>
          </div>
        </div>
      </div>

      {/* 기타 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">추가 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">모집지역</div>
            <div className="detail-content">{detail?.dsEtcInfo?.[0]?.ARAG_RCR_HSH_CTS || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">임대기간</div>
            <div className="detail-content">{detail?.dsEtcInfo?.[0]?.LSTR_CTS || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">임대료</div>
            <div className="detail-content">{detail?.dsEtcInfo?.[0]?.LSC_CTS || '-'}</div>
          </div>
        </div>
      </div>

      {/* 첨부파일 섹션 */}
      {detail?.dsAhflInfo?.length > 0 && (
        <div className="detail-section">
          <h3 className="detail-subtitle">첨부파일</h3>
          <div className="file-list">
            {detail.dsAhflInfo.map((file, idx) => (
              <a key={idx} href={file.AHFL_URL} className="file-link">
                📄 {file.CMN_AHFL_NM}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnouncementDetailTable;
