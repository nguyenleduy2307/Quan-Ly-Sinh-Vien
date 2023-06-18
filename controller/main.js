/* 
==================== Tạo thư mục =======================
- Util: dùng để chứ file validation
- Model: dùng để chứa các file lớp đối tượng
- Controller: dùng để chứa các file xử lý giao diện (click button, hover, ...)
==> import vào html theo đúng thự tự trên
*/


/**
 * Validation cho các input còn lại ??
 * Ẩn hiện btn khi thêm/ update
 */


// ======= Tạo domID function để dom nhanh hơn =======
function domID(id) {
    return document.querySelector(id);
}

// ==== Tạo đối tượng dssv để chứa sinh viên lấy từ user ====
var dssv = new DSSV;

// ========= Gọi DSSV từ Local Storage lên ==========
getLocalStorage();

// == Tạo hàm Lấy thông tin từ user => tạo đối tượng sinhVien từ thông tin vừa lấy ==
// Tham số isEdit để phân biệt là thêm sv hay update sv
// Ở thêm sv => truyền false, ở update sv => truyền true

function getThongTinSV(isEdit) {
    // Lấy thông tin từ user:
    var maSV = domID('#txtMaSV').value;
    var tenSV = domID('#txtTenSV').value;
    var email = domID('#txtEmail').value;
    var matKhau = domID('#txtPass').value;
    var ngaySinh = domID('#txtNgaySinh').value;
    var khoaHoc = domID('#khSV').value;
    var diemToan = +domID('#txtDiemToan').value;
    var diemLy = +domID('#txtDiemLy').value;
    var diemHoa = +domID('#txtDiemHoa').value;

    // Tạo đối tượng sinh viên từ thông tin lấy từ user:
    var sinhVien = new SinhVien(
        maSV,
        tenSV,
        email,
        matKhau,
        ngaySinh,
        khoaHoc,
        diemToan,
        diemLy,
        diemHoa
    );

    // ==================== Validation =======================

    /** Đặt cờ hiệu isValid: 
     * Nếu là true ==> tạo đối tượng sinh viên mới
     * Nếu là false ==> không tạo
     */
    var isValid = true;
    
    // Kiểm tra mã số sinh viên:
    isValid &= 
        // Kiểm tra phải là chuỗi rỗng không
        kiemTraChuoi (sinhVien.maSV, 1, undefined, '#spanMaSV', 'Mã sinh viên không được để trống')
        // Kiểm tra chiều dài chuỗi
        && kiemTraChuoi (sinhVien.maSV,6,10,'#spanMaSV', 'Mã sinh viên phải từ 6 đến 10 ký tự')
        // Kiểm tra MSSV đã tồn tại chưa
        && kiemTraMaSV (sinhVien.maSV, dssv.arrSV, isEdit, '#spanMaSV', 'Mã sinh viên đã tồn tại');
    
    // Kiểm tra tên sinh viên không được rỗng:
    isValid &= kiemTraChuoi (sinhVien.tenSV, 1, undefined,'#spanTenSV' , 'Tên sinh viên không được để trống');

    // Kiểm tra định dạng email:
    isValid &= kiemTraPattern(sinhVien.email, '#spanEmailSV',/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Định dạng email không hợp lệ');

    // Nếu isValid vẫn là true thì tạo đối tượng SV:
    return isValid ? sinhVien : undefined;
}

// =========== CHỨC NĂNG THÊM SINH VIÊN ============
domID('#themSV').onclick = function () {

    // Tạo đối tượng sinhVien từ thông tin user nhập:
    // Truyền cho tham số false để kiểm tra MaSV trùng nhau
    var sinhVien = getThongTinSV(false);

    // Gọi phương thức thêm sinh viên để thêm sv vào mảng arrSV:
    dssv.themSV(sinhVien);

    // Gọi hàm renderdssv để in dssv lên giao diện:
    renderdssv();

    // Lưu sinh viên vừa nhập vào Local Storage:
    setLocalStorage();

    // Reset lại form sau khi thêm:
    domID('#formQLSV').reset();
}

// ============= Render - Xuất DSSV ra giao diện ==============

/** Gán giá trị dssv.arrSV để:
 * ==> Khi không truyền tham số cho hàm renderdssv thì mặc định tham số sẽ là dssv.arrSV
 * ==> Gọi là Default parameter
 */

function renderdssv(arrSV = dssv.arrSV) {
    var content = '';
    for (var i = 0; i < arrSV.length; i++) {
        var sv = arrSV[i];

        // content += '<tr>'
        // content += '<td>' + sv.maSV + '</td>'
        // content += '<td>' + sv.tenSV + '</td>'
        // content += '<td>' + sv.email + '</td>'
        // content += '<td>' + sv.ngaySinh + '</td>'
        // content += '<td>' + sv.khoaHoc + '</td>'
        // content += '</tr>'

        content += ` <tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoaHoc}</td>
            <td>${sv.tinhDTB()}</td>
            <td>
                <button class="btn btn-success" onclick="updateSV('${sv.maSV}')">Edit</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteSV('${sv.maSV}')">Delete</button>
            </td>

            </tr>`

        // nên truyền mã sinh viên là string
    }
    domID('#tbodySinhVien').innerHTML = content;
}

// =========== Lưu danh sách sinh viên vào Local Storage ============
function setLocalStorage() {
    localStorage.setItem('DSSV', JSON.stringify(dssv.arrSV));
}

// ========== Get danh sách sinh viên từ Local Storage =============
function getLocalStorage() {
    // B1: Lấy data từ local:
    var data = localStorage.getItem('DSSV');
    if (data) {  // kiểm tra data có dữ liệu không, nếu có thì thực hiện, không có thì thôi
        // B2: Parsedata về dữ liệu ban đầu:
        var pasreData = JSON.parse(data);

        /*
        =====>>> Tạo lại đối tượng sinhVien từ lớp đối tượng SinhVien
                để lấy lại phương thức tính điểm trung bình
                (Vì Local Storage không lưu được phương thức) <<<=====
        */
        // Tạo mảng arr rỗng:
        var arr = [];
        // Duyệt mảng pasreData:
        for (var i = 0; i < pasreData.length; i++) {
            var sv = pasreData[i];
            // Tạo đối tượng SV mới
            var sinhVien = new SinhVien(
                sv.maSV,
                sv.tenSV,
                sv.email,
                sv.matKhau,
                sv.ngaySinh,
                sv.khoaHoc,
                sv.diemToan,
                sv.diemLy,
                sv.diemHoa
            )
            // Thêm sv vào mảng arr
            arr.push(sinhVien);
        }
        // B3: Gán giá trị cho mảng arrSV từ data lấy từ Local Storage:
        dssv.arrSV = arr;
        renderdssv();
    }
}

// ===================== Xóa sinh viên =========================
function deleteSV(maSV) {
    dssv.xoaSV(maSV);

    // Gọi lại renderdssv để cập nhật lại UI sau khi xóa thành công
    renderdssv();

    // Cập nhật lại data lưu dưới local storage:
    setLocalStorage();
}


// ===================== Cập nhật sinh viên =========================
function updateSV(maSV) {
    // Lấy ra index cần cập nhật:
    var index = dssv.timSV(maSV);
    // Lấy ra mảng của index cần cập nhật:
    var sv = dssv.arrSV[index];

    // Đẩy data lên input:
    domID('#txtMaSV').value = sv.maSV;
    domID('#txtTenSV').value = sv.tenSV;
    domID('#txtEmail').value = sv.email;
    domID('#txtPass').value = sv.matKhau;
    domID('#txtNgaySinh').value = sv.ngaySinh;
    domID('#khSV').value = sv.khoaHoc;
    domID('#txtDiemToan').value = sv.diemToan;
    domID('#txtDiemLy').value = sv.diemLy;
    domID('#txtDiemHoa').value = sv.diemHoa;
}

// =============== Tạo hàm cập nhật lại sinh viên ===================
domID('#capNhatSV').onclick = function () {
    // Lấy thông tin sinh viên sau khi sửa:
    // Truyền cho tham số true để không kiểm tra MaSV trùng nhau
    var sinhVien = getThongTinSV(true);

    // Cập nhật vào dssv:
    dssv.capNhatSV(sinhVien);

    // Gọi lại renderdssv để cập nhật lại UI sau khi xóa thành công
    renderdssv();

    // Cập nhật lại data lưu dưới local storage:
    setLocalStorage();

    // Reset lại form sau khi cập nhật:
    domID('#formQLSV').reset();
}

// ================== Tạo hàm Reset dữ liệu ==================
domID('#btnReset').onclick = function () {
    domID('#formQLSV').reset();
}

// ============= Cách khác để reset dữ liệu ==============
// ==> Đổi type của btn reset từ button thành reset
// ==> Chỉ áp dụng cho btn trong form

// =================== Tạo hàm tìm kiếm sinh viên ===================

/** Sự kiện keyup: gọi hàm khi người dùng nhả phím trong ô input
 *  Không cần bấm nút Search
 */

domID('#txtSearch').addEventListener('keyup', function() {

    // Lấy giá trị từ ô input, đưa về dạng chữ thường:
    var valueSearch = domID('#txtSearch').value.toLowerCase();

    // Tạo mảng rỗng chứa sinh viên được search:
    var arrSVSearch = [];

    // Duyệt mảng => tìm sinh viên khớp với tên SV đc tìm:
    for (var i=0; i<dssv.arrSV.length; i++) {
        var tenSV = dssv.arrSV[i].tenSV.toLowerCase();
        if (tenSV.indexOf(valueSearch) !== -1) {
            /** indexOf để tìm giá trị vị trí của (valueSearch) đứng trong chuỗi (tenSV)
             * ==> Nếu không tìm thấy trả về -1
            */
            arrSVSearch.push(dssv.arrSV[i]);
        }
    }

    // Render ra giao diện:
    renderdssv(arrSVSearch);
})



//================= KIẾN THỨC BỔ TRỢ ====================

//=================== Template string ====================
// ==> Lợi ích: có thể xuống dòng

var bien1 = 'Nguyen';
var bien2 = 'Le';
var bien3 = 'Duy';

// var sum = bien1 + bien2 + ' ' + bien3;
var sum = ''
sum = `${bien1} 
${bien2} ${bien3}`;

console.log("Template string_sum: ", sum);


// ==================== Local Storage ======================
// ==> Dùng để lưu data dưới dạng chuỗi. (Không lưu được phương thức)
// ==> Dùng để lưu data trên trình duyệt: chạy lại trang, tắt trang mở lại: ==> không mất data
// ==> Ứng dụng: lưu thông tin đăng nhập của user

var student = {
    name: 'nguyen le duy',
    age: 25,
    address: 'HCM',
    getInfo: function () {
    }
}

// ==> Lưu vào local:
localStorage.setItem('SV1', JSON.stringify(student));
// ==> 2 tham số: tên muốn lưu, nội dung muốn lưu
// ==> Chỉ lưu thuộc tính, không lưu phương thức

// ==> Lấy data từ local:
var value = localStorage.getItem('SV1');

// ==> Chuyển dữ liệu lấy từ local về dạng ban đầu
var parseValue = JSON.parse(value);

// ==> Xóa dữ liệu:
// localStorage.removeItem('SV')

// ==> in ra:
console.log("parseValue: ", parseValue);
console.log('value: ', value);


// ==================== Trusy & Falsy ========================
// ==> Falsy: false, 0 , '', undefined, null, NaN
// ==> Còn lại là Trusy: mảng rỗng [], object rỗng {}, ...


// =========== Cách sử dụng 2 dấu chấm thang "!!" ===========
// ==> Luôn trả về kiểu Boolean
var x = '';
console.log('!!', !!x);


// ================= Lấy ra key của object ==============

var obj1 = {
    name: 'Duy',
    age: 25
}

// ==> Object.keys:
// ==> Trả về mảng chứa tất cả các key của obj1
var k = Object.keys(obj1)
console.log("Object.keys(obj1):", k);

// ==> Duyệt obj1:
for (var i = 0; i < k.length; i++) {
    var key = k[i];
    console.log('Obj1', key, obj1[key]);
}

// ============== Default parameter =======================

function demo (number = 123) {
    console.log('Default parameter: ',number);
}

// => truyền tham số:
demo(456); // in ra 456

// => không truyền tham số:
demo();



