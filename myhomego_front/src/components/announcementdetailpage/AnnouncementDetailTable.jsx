import React from 'react';
import './AnnoucementDetail.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import styles from './AnnouncementDetailTable.module.css';
import { Button } from "@/components/ui/button"

function AnnouncementDetailTable({ detail, spl }) {
  // detail이 없으면 spl을 detail처럼 활용
  const main = detail || spl;
  // spl의 특별공급 목록 예시 출력
  const splList = spl?.dsList02 || [];
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
        <div className="detail-row mt-2">
          <div className="detail-label">공고번호</div>
          <div className="detail-content">{main?.PAN_ID || '-'}</div>
        </div>
        <div className="detail-row mt-2">
          <div className="detail-label">공고페이지</div>
          <div className="detail-content">
            {main?.DTL_URL ? (
              <Button
                onClick={() => window.open(main.DTL_URL, '_blank')}
                className="bg-[#5DC1B7] text-black cursor-pointer"
              >
                공고페이지로 이동
              </Button>
            ) : (
              <span className="no-url">URL 없음</span>
            )}
          </div>
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
      <Table>
        <TableCaption>공급 세부내역</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">주소(DNG_HS_ADR)</TableHead>
            <TableHead>공급호수(LTR_SPL_RMNO)</TableHead>
            <TableHead>시군구명(CNP_NM)</TableHead>
            <TableHead className="text-right">공급세대수(QUP_CNT)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splList.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.DNG_HS_ADR}</TableCell>
              <TableCell>{item.LTR_SPL_RMNO}</TableCell>
              <TableCell>{item.CNP_NM}</TableCell>
              <TableCell className="text-right">{item.QUP_CNT}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
function GroupedTable({ data }) {
  // 1. CNP_NM(지역명)별로 그룹화
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.CNP_NM]) acc[item.CNP_NM] = [];
    acc[item.CNP_NM].push(item);
    return acc;
  }, {});

  return (
    <table className="min-w-full border">
      <caption className="caption-top">공급 세부내역</caption>
      <thead>
        <tr>
          <th className="border px-4 py-2">시군구명(CNP_NM)</th>
          <th className="border px-4 py-2">공급호수(LTR_SPL_RMNO)</th>
          <th className="border px-4 py-2">주소(DNG_HS_ADR)</th>
          <th className="border px-4 py-2 text-right">공급세대수(QUP_CNT)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([region, items]) =>
          items.map((item, idx) => (
            <tr key={region + idx}>
              {/* 첫 행에만 rowSpan 적용해서 '인천광역시' 등 지역명 한 번만 출력 */}
              {idx === 0 && (
                <td rowSpan={items.length} className="border px-4 py-2 font-bold align-middle bg-gray-50">
                  {region}
                </td>
              )}
              <td className="border px-4 py-2">{item.LTR_SPL_RMNO}</td>
              <td className="border px-4 py-2">{item.DNG_HS_ADR}</td>
              <td className="border px-4 py-2 text-right">{item.QUP_CNT}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
export default AnnouncementDetailTable;
