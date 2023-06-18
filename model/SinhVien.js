
// ========= Tạo lớp đối tượng sinh viên =============
// ==> dùng để quản lý thông tin user nhập vào:

function SinhVien(_maSV, _tenSV, _email, _matKhau, _ngaySinh, _khoaHoc, _diemToan, _diemLy, _diemHoa) {
    this.maSV = _maSV;
    this.tenSV = _tenSV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngaySinh = _ngaySinh;
    this.khoaHoc = _khoaHoc;
    this.diemToan = _diemToan;
    this.diemLy = _diemLy;
    this.diemHoa = _diemHoa;
    this.tinhDTB = function () {
        return (this.diemToan + this.diemLy + this.diemHoa) / 3;
    }
}
