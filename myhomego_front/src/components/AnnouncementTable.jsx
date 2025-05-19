import React from 'react';
function AnnouncementTable(props) {
  const { announcements } = props;
  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2">번호</th>
          <th className="border px-4 py-2">지역</th>
          <th className="border px-4 py-2">공고명</th>
          <th className="border px-4 py-2">청약유형</th>
          <th className="border px-4 py-2">공고일</th>
          <th className="border px-4 py-2">청약일</th>
          <th className="border px-4 py-2">접수일</th>
          <th className="border px-4 py-2">상태</th>
        </tr>
      </thead>
      <tbody>
        {announcements.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{item.CNP_CD_NM}</td>
            <td className="border px-4 py-2">
              <a href={item.DTL_URL} target="_blank" rel="noopener noreferrer">
                {item.PAN_NM}
              </a>
            </td>
            <td className="border px-4 py-2">{item.AIS_TP_CD_NM}</td>
            <td className="border px-4 py-2">{item.PAN_NT_ST_DT}</td>
            <td className="border px-4 py-2">{item.CLSG_DT}</td>
            <td className="border px-4 py-2">{item.CLSG_DT}</td>
            <td className="border px-4 py-2">{item.PAN_SS}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AnnouncementTable;