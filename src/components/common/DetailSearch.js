
import React, { useState, useEffect } from "react";



const DetailSearch = ({ onClose }) => {






    return (
        // 배경 클릭 시 닫히도록 onClose 연결
        <div className="modal-overlay" onClick={onClose}>
            
            {/* e.stopPropagation()은 모달 내부 클릭 시 창이 닫히지 않게 방어해줍니다.*/}
            <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                <h2>상세 검색</h2>

                <table className="filter-table">
                    <tbody>
                        <tr>
                            <th>장르</th>
                            <td>
                                <select className="filter-select">
                                    <option value="">모든 장르</option>
                                    <option value="28">액션</option>
                                    <option value="35">코미디</option>
                                    <option value="18">드라마</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>최소 평점</th>
                            <td>
                                <div className="vote-average">
                                    <input type="number" />
                                    
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>개봉 연도</th>
                            <td>
                                <div className="year-buttons">
                                    <button className="year-btn active">전체</button>
                                    <button className="year-btn">2026</button>
                                    <button className="year-btn">2025</button>
                                    <button className="year-btn">2024</button>
                                    <button className="year-btn">2020s</button>
                                    <button className="year-btn">2010s</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="modal-footer">
                    {/*  버튼 클릭 시에도 닫히도록 onClose 연결*/} 
                    <button className="close-btn" onClick={onClose}>닫기</button>
                    <button className="apply-btn">필터 적용</button>
                </div>
            </div>
        </div>
    );
};

export default DetailSearch;