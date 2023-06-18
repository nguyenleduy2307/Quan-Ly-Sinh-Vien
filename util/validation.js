
//======= Tạo hàm kiểm tra chiều dài của giá trị nhập vào ===============

/**
 * @param value: giá trị chuỗi cần kiểm tra
 * @param minLength: chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param maxLength: chiều dài tối đa của chuỗi cần kiểm tra
 *    ==> minLength = 1 & maxLength = underfined : dùng để kiểm tra chuỗi rỗng
 * @param selector: selector của thẻ muốn hiển thị lỗi
 * @param messErr: nội dung lỗi muốn hiển thị lên UI, nếu value không thỏa mãn điều kiện
 */

function kiemTraChuoi (value, minLength, maxLength, selector, messErr) {
    // Nếu như kết quả kiểm tra là false:
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        // Hàm trim() để xóa khoảng trắng đầu đuôi (vì khoảng trắng cũng là strings)
        /** Tại sao lại dùng Number(maxLength) ????
         * 
         * 
         *  Tại sao kiểm tra chuỗi rỗng thì maxLength = undefined ????
         * 
         * 
         */

        domID(selector).innerHTML = messErr;
        return false;
    }
    // Nếu chuỗi đúng:
    else {
        domID(selector).innerHTML = '';
        return true;
    }
}


// ======= Tạo hàm kiểm tra ký tự của giá trị nhập vào ========

/**
 * @param value: giá trị chuỗi cần kiểm tra
 * @param selector: selector của thẻ muốn hiển thị lỗi
 * @param pattern: pattern để kiểm tra chuỗi
 * @param messErr: nội dung lỗi muốn hiển thị
 */

function kiemTraPattern (value, selector, pattern, messErr ) {
    // Nếu chuỗi không thỏa mãn pattern
    if (!pattern.test(value)) {
        domID(selector).innerHTML = messErr;
        return false;
    }

    // Nếu chuỗi đúng:
    else {
        domID(selector).innerHTML = '';
        return true;
    }
}


// ============= Tạo hàm kiểm tra input mã sinh viên trùng nhau =============

/**
 * @param isEdit: 
 *  + true: khi update không cần kiểm tra trùng
 *  + false: khi thêm sinh viên sẽ kiểm tra trùng
 * ==> Thêm tham số isEdit vào hàm getThongTinSV để biết khi nào cần kiểm tra trùng
 */

function kiemTraMaSV (maSV, dssv, isEdit, selector, messErr) {
    // True: là update ==> không cần kiểm tra
    // False: là false ==> cần kiểm tra
    if (isEdit) return true;

    // Đặt cờ hiệu isFlag = true. Nếu có MSSV trùng: isFlag = false
    var isFlag = true;
    for (var i=0; i < dssv.length; i++) {
        if (dssv[i].maSV === maSV) {
            isFlag = false;
            break
        }
    }

    // Nếu không trùng nhau:
    if (isFlag) {
        domID(selector).innerHTML = '';
        return true;
    }

    // Nếu trùng nhau:
    else {
        domID(selector).innerHTML = messErr;
        return false;
    }

}