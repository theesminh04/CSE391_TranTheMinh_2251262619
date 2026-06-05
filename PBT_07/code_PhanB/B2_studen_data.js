const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

//xếp loại
let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;

//điểm từng môn
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

//điểm theo giới tính
let totalMale = 0;
let totalFemale = 0;
let countMale = 0;
let countFemale = 0;

//tìm sinh viên cao, thấp nhất
let maxStudent = null;
let minStudent = null;

//bảng kết quả
console.log("| STT | Tên    | TB   | Xếp loại     |");
console.log("|-----|--------|------|--------------|");

for (let i = 0; i < students.length; i++) {
    let s = students[i];

    //điểm trung bình
    let average = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;

    //Xếp loại
    let rank = "";

    if (average >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (average >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (average >= 5.0) {
        rank = "Trung bình";
        countTrungBinh++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    //lưu điểm trung bình, xếp loại vào object sinh viên
    s.average = average;
    s.rank = rank;

    //tìm sinh viên TB cao, thấp nhất
    if (maxStudent === null || average > maxStudent.average) {
        maxStudent = s;
    }

    if (minStudent === null || average < minStudent.average) {
        minStudent = s;
    }

    //tổng điểm theo môn
    totalMath += s.math;
    totalPhysics += s.physics;
    totalCS += s.cs;

    //tính tổng điểm TB theo giới tính
    if (s.gender === "M") {
        totalMale += average;
        countMale++;
    } else if (s.gender === "F") {
        totalFemale += average;
        countFemale++;
    }

    //bảng kết quả
    console.log(
        "| " + (i + 1) +
        "   | " + s.name +
        " | " + average.toFixed(1) +
        "  | " + rank +
        " |"
    );
}

//số sinh viên theo xếp loại
console.log("\nSố sinh viên mỗi xếp loại:");
console.log("Giỏi: " + countGioi);
console.log("Khá: " + countKha);
console.log("Trung bình: " + countTrungBinh);
console.log("Yếu: " + countYeu);

//sinh viên cao, thấp nhất
console.log("\nSinh viên có điểm TB cao nhất:");
console.log(maxStudent.name + " - TB: " + maxStudent.average.toFixed(1));

console.log("\nSinh viên có điểm TB thấp nhất:");
console.log(minStudent.name + " - TB: " + minStudent.average.toFixed(1));

//TB toàn lớp cho từng môn
let avgMath = totalMath / students.length;
let avgPhysics = totalPhysics / students.length;
let avgCS = totalCS / students.length;

console.log("\nĐiểm TB toàn lớp cho từng môn:");
console.log("Toán: " + avgMath.toFixed(1));
console.log("Lý: " + avgPhysics.toFixed(1));
console.log("Tin: " + avgCS.toFixed(1));

//TB theo giới tính
let avgMale = totalMale / countMale;
let avgFemale = totalFemale / countFemale;

console.log("\nĐiểm TB theo giới tính:");
console.log("Nam: " + avgMale.toFixed(1));
console.log("Nữ: " + avgFemale.toFixed(1));