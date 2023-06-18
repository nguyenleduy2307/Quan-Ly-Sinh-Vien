
// ======= Tạo lớp đối tượng danh sách nhân viên ========
// ==> dùng để quản lý DSSV sau khi nhập vào:
function DSSV() {

    // ===== Tạo ra mảng rỗng để lưu DSSV (quản lý DSSV => nghĩ đến mảng) ====
    this.arrSV = [];

    // ============ Tạo thuộc tính THÊM SINH VIÊN ===========
    this.themSV = function (sinhVien) {
        // Thêm sinhVien vào mảng
        this.arrSV.push(sinhVien);
    };

    // Hàm tìm sinh viên, sẽ trả về index của mã sinh viên nhập vào:
    this.timSV = function (maSinhVien) {
        // B1: Tìm index:
        for (var i=0; i < this.arrSV.length; i++) {
            var maSV = this.arrSV[i].maSV;
            if (maSV === maSinhVien) {
                return i;
            }
        }
        return -1;
    }

    // ============ Tạo thuộc tính XÓA SINH VIÊN ===========
    this.xoaSV = function (maSinhVien) {
        // var index = -1
        // // B1: Tìm index của phần tử cần xóa, dựa vào thuộc tính mã sinh viên:
        // for (var i=0; i < this.arrSV.length; i++) {
        //     var maSV = this.arrSV[i].maSV;  // maSV là string
        //     if (maSV === maSinhVien) { // maSinhVien cũng nên là string
        //         index = i;
        //     }
        // }
        
        // B2: Xóa phần tử có index tìm đc:
        // Nếu index = -1 => không có mã sinh viên nào tìm được => không xóa

        var index = this.timSV(maSinhVien);
        if (index !== -1) {
            this.arrSV.splice(index,1)
        }

    };

    this.capNhatSV = function (sinhVien) {
        var index = this.timSV(sinhVien.maSV);
        if (index !== -1) {
            this.arrSV[index] = sinhVien;
        }

    }
}