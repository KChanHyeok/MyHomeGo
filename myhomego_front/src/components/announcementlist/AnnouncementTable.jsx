import React from 'react';
import { Link } from 'react-router-dom';
function AnnouncementTable(props) {
  const { announcements } = props;
  return (
    <table className="w-full border">
      <thead className="bg-[#EFFFF8]">
        <tr>
          <th className="border px-4 py-2">번호</th>
          <th className="border px-4 py-2">지역</th>
          <th className="border px-4 py-2">공고명</th>
          <th className="border px-4 py-2">청약유형</th>
          <th className="border px-4 py-2">게시일</th>
          <th className="border px-4 py-2">마감일</th>
          <th className="border px-4 py-2">상태</th>
        </tr>
      </thead>
      <tbody>
        {announcements.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{item.ANNOUNCEMENT_NO}</td>
            <td className="border px-4 py-2">{item.CNP_CD_NM}</td>
            <td className="border px-4 py-2">
              <Link
                to={`/announcement/${item.PAN_ID}`}
                state={{
                  SPL_INF_TP_CD: item.SPL_INF_TP_CD,
                  CCR_CNNT_SYS_DS_CD: item.CCR_CNNT_SYS_DS_CD,
                  UPP_AIS_TP_CD: item.UPP_AIS_TP_CD
                }}
              >
                {item.PAN_NM}
              </Link>
            </td>
            <td className="border px-4 py-2">{item.AIS_TP_CD_NM}</td>
            <td className="border px-4 py-2">{item.PAN_NT_ST_DT}</td>
            <td className="border px-4 py-2">{item.CLSG_DT}</td>
            <td className="border px-4 py-2">{item.PAN_SS}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AnnouncementTable;