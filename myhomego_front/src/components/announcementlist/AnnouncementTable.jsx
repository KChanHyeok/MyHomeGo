import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function AnnouncementTable(props) {
  const { announcements } = props;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ECFFF7]">
            <TableHead>번호</TableHead>
            <TableHead>지역</TableHead>
            <TableHead>공고명</TableHead>
            <TableHead>청약유형</TableHead>
            <TableHead>게시일</TableHead>
            <TableHead>마감일</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.ANNOUNCEMENT_NO}</TableCell>
              <TableCell>{item.CNP_CD_NM}</TableCell>
              <TableCell>
                <a href={item.DTL_URL} target="_blank" rel="noopener noreferrer">
                  {item.PAN_NM}
                </a>
              </TableCell>
              <TableCell>{item.AIS_TP_CD_NM}</TableCell>
              <TableCell>{item.PAN_NT_ST_DT}</TableCell>
              <TableCell>{item.CLSG_DT}</TableCell>
              <TableCell>{item.PAN_SS}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AnnouncementTable;