import React from 'react';
import './AnnoucementDetail.css';

function AnnouncementDetailTable({ detail, spl }) {
  // detail이 없으면 spl을 detail처럼 활용
  const main = detail || spl;

  // spl의 특별공급 목록 예시 출력
  const splList = spl?.dsList02 || [];
  console.log(detail)
  console.log(spl)
  return (
    <div className="detail-table-wrap">
      <h2 className="detail-table-title">공고 상세정보</h2>

      {/* 기본 정보 섹션 */}
      <div className="detail-section">
        <div className="detail-row">
          <div className="detail-label">공고명</div>
          <div className="detail-content">{main?.PAN_NM || '-'}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">공고번호</div>
          <div className="detail-content">{main?.PAN_ID || '-'}</div>
        </div>
      </div>

      {/* 서류접수기간 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">접수 일정</h3>
        <div className="detail-grid-3">
          <div className="detail-row">
            <div className="detail-label">접수기간 시작일</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.SBSC_ACP_ST_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">접수기간 종료일</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.SBSC_ACP_CLSG_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류대상자 발표일</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.PPR_SBM_OPE_ANC_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류접수 시작일</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.PPR_ACP_ST_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">서류접수 종료일</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.PPR_ACP_CLSG_DT || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">당첨자 발표</div>
            <div className="detail-content">{main?.dsSplScdl?.[0]?.PZWR_ANC_DT || '-'}</div>
          </div>
        </div>
      </div>

      {/* 운영기간 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">운영 기간</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">시작일</div>
            <div className="detail-content">{main?.dsCtrtPlc?.[0]?.TSK_ST_DTTM || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">종료일</div>
            <div className="detail-content">{main?.dsCtrtPlc?.[0]?.TSK_ED_DTTM || '-'}</div>
          </div>
        </div>
      </div>

      {/* 접수처 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">접수처 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">주소</div>
            <div className="detail-content">{main?.dsSbdDongAhfl?.[0]?.CTRT_PLC_ADR || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">전화번호</div>
            <div className="detail-content">{main?.dsCtrtPlc?.[0]?.SIL_OFC_TLNO || '-'}</div>
          </div>
        </div>
      </div>

      {/* 단지 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">단지 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">단지</div>
            <div className="detail-content">{main?.dsSbd?.[0]?.BZDT_NM || '-'}</div>
          </div>
        </div>
      </div>

      {/* 기타 정보 섹션 */}
      <div className="detail-section">
        <h3 className="detail-subtitle">추가 정보</h3>
        <div className="detail-grid">
          <div className="detail-row">
            <div className="detail-label">모집지역</div>
            <div className="detail-content">{main?.dsEtcInfo?.[0]?.ARAG_RCR_HSH_CTS || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">임대기간</div>
            <div className="detail-content">{main?.dsEtcInfo?.[0]?.LSTR_CTS || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">임대료</div>
            <div className="detail-content">{main?.dsEtcInfo?.[0]?.LSC_CTS || '-'}</div>
          </div>
        </div>
      </div>

      {/* 첨부파일 섹션 */}
      {main?.dsAhflInfo?.length > 0 && (
        <div className="detail-section">
          <h3 className="detail-subtitle">첨부파일</h3>
          <div className="file-list">
            {main.dsAhflInfo.map((file, idx) => (
              <a key={idx} href={file.AHFL_URL} className="file-link">
                📄 {file.CMN_AHFL_NM}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* spl 데이터가 있을 때 특별공급 목록 추가 출력 예시 */}
      {splList.length > 0 && (
        <div className="detail-section">
          <h3 className="detail-subtitle">특별공급 목록</h3>
          <ul>
            {splList.map((item, idx) => (
              <li key={idx}>
                {/* spl의 주요 속성 출력 (예시) */}
                {item.SPL_INF_TP_CD_NM} - {item.HSHLD_CNT}가구
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnnouncementDetailTable;
