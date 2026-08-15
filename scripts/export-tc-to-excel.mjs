import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Test case data ──────────────────────────────────────────────────────────
const testCases = [
  {
    id: 'TC_LOGIN_001',
    title: 'Verify user can log in with valid username and password',
    preconditions: 'User đã có tài khoản trong hệ thống\nUser chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username hợp lệ vào field "Username"\n3. Nhập password đúng vào field "Password"\n4. Click nút "Đăng nhập"',
    testData: 'username: admin\npassword: 123456',
    expectedResult: '- Đăng nhập thành công\n- User được redirect về trang Home (/)\n- UI phản ánh trạng thái đăng nhập (hiển thị tên user hoặc nút Logout)',
    requirement: 'US-LOGIN-01, AC1',
    technique: 'Use Case Testing',
    priority: 'Critical',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_002',
    title: 'Verify auth state is persisted after successful login',
    preconditions: 'User đã đăng nhập thành công (TC_LOGIN_001 passed)',
    steps: '1. Reload trang sau khi đã đăng nhập thành công\n2. Kiểm tra trạng thái đăng nhập',
    testData: 'N/A',
    expectedResult: '- User vẫn ở trạng thái đăng nhập sau reload\n- UI vẫn hiển thị tên user hoặc nút Logout',
    requirement: 'US-LOGIN-01, AC1, A2',
    technique: 'State Transition Testing',
    priority: 'High',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_003',
    title: 'Verify error message is shown when password is incorrect',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username hợp lệ\n3. Nhập password sai\n4. Click nút "Đăng nhập"',
    testData: 'username: admin\npassword: wrongpass',
    expectedResult: '- Hiển thị thông báo lỗi rõ ràng (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")\n- User vẫn ở trang /login\n- Form không bị xóa (username vẫn còn trong field)',
    requirement: 'US-LOGIN-01, AC2',
    technique: 'Equivalence Partitioning, Error Guessing',
    priority: 'Critical',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_004',
    title: 'Verify error message is shown when username is incorrect',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username không tồn tại trong hệ thống\n3. Nhập password bất kỳ\n4. Click nút "Đăng nhập"',
    testData: 'username: nonexistent_user\npassword: anypassword',
    expectedResult: '- Hiển thị thông báo lỗi rõ ràng (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")\n- User vẫn ở trang /login\n- Thông báo lỗi không tiết lộ username có tồn tại hay không (tránh user enumeration)',
    requirement: 'US-LOGIN-01, AC2',
    technique: 'Equivalence Partitioning, Error Guessing',
    priority: 'Critical',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_005',
    title: 'Verify error message is shown when both username and password are incorrect',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username không hợp lệ\n3. Nhập password sai\n4. Click nút "Đăng nhập"',
    testData: 'username: wrong_user\npassword: wrongpass',
    expectedResult: '- Hiển thị thông báo lỗi rõ ràng\n- User vẫn ở trang /login\n- Form không bị xóa',
    requirement: 'US-LOGIN-01, AC2',
    technique: 'Equivalence Partitioning',
    priority: 'High',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_006',
    title: 'Verify validation error when username field is empty',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Để trống field "Username"\n3. Nhập password hợp lệ\n4. Click nút "Đăng nhập"',
    testData: 'username: (empty)\npassword: 123456',
    expectedResult: '- Field "Username" được highlight lỗi\n- Hiển thị thông báo validation (ví dụ: "Username là bắt buộc")\n- Không có request nào được gửi lên server',
    requirement: 'US-LOGIN-01, AC3',
    technique: 'Equivalence Partitioning, Boundary Value Analysis',
    priority: 'Critical',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_007',
    title: 'Verify validation error when password field is empty',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username hợp lệ\n3. Để trống field "Password"\n4. Click nút "Đăng nhập"',
    testData: 'username: admin\npassword: (empty)',
    expectedResult: '- Field "Password" được highlight lỗi\n- Hiển thị thông báo validation (ví dụ: "Password là bắt buộc")\n- Không có request nào được gửi lên server',
    requirement: 'US-LOGIN-01, AC3',
    technique: 'Equivalence Partitioning, Boundary Value Analysis',
    priority: 'Critical',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_008',
    title: 'Verify validation errors when both username and password fields are empty',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Để trống cả hai field "Username" và "Password"\n3. Click nút "Đăng nhập"',
    testData: 'username: (empty)\npassword: (empty)',
    expectedResult: '- Cả hai field đều được highlight lỗi\n- Hiển thị thông báo validation cho từng field\n- Không có request nào được gửi lên server',
    requirement: 'US-LOGIN-01, AC3',
    technique: 'Decision Table Testing',
    priority: 'High',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_009',
    title: 'Verify navigation to Register page',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Click link "Đăng ký"',
    testData: 'N/A',
    expectedResult: '- User được chuyển đến trang /register\n- Trang Register được hiển thị đúng',
    requirement: 'US-LOGIN-01, AC4',
    technique: 'Use Case Testing',
    priority: 'Medium',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_010',
    title: 'Verify password field does not display plain text',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập password vào field "Password"\n3. Quan sát giá trị hiển thị trên field',
    testData: 'password: 123456',
    expectedResult: '- Password được hiển thị dưới dạng ký tự ẩn (dấu chấm hoặc dấu hoa thị)\n- Input type="password" được áp dụng',
    requirement: 'US-LOGIN-01, NFR-SEC-01',
    technique: 'Error Guessing',
    priority: 'High',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_011',
    title: 'Verify login form is accessible via keyboard navigation',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Sử dụng phím Tab để điều hướng qua các field\n3. Nhập username và password bằng bàn phím\n4. Nhấn Enter để submit form',
    testData: 'username: admin\npassword: 123456',
    expectedResult: '- Tab order hợp lý: Username → Password → Nút Đăng nhập\n- Focus indicator hiển thị rõ ràng trên từng phần tử\n- Form có thể submit bằng phím Enter',
    requirement: 'US-LOGIN-01, AC1',
    technique: 'Exploratory Testing',
    priority: 'Medium',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_012',
    title: 'Verify login with username containing special characters (SQL Injection)',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: "1. Truy cập /login\n2. Nhập username chứa ký tự đặc biệt\n3. Nhập password bất kỳ\n4. Click nút \"Đăng nhập\"",
    testData: "username: ' OR 1=1 --\npassword: anypassword",
    expectedResult: '- Hệ thống không bị SQL Injection\n- Hiển thị thông báo lỗi đăng nhập thất bại\n- Không có data leakage',
    requirement: 'US-LOGIN-01, AC2',
    technique: 'Error Guessing',
    priority: 'High',
    automation: 'Yes',
  },
  {
    id: 'TC_LOGIN_013',
    title: 'Verify error message does not expose sensitive system information',
    preconditions: 'User chưa đăng nhập\nỨng dụng đang chạy',
    steps: '1. Truy cập /login\n2. Nhập username và password sai\n3. Click nút "Đăng nhập"\n4. Kiểm tra nội dung thông báo lỗi',
    testData: 'username: wrong_user\npassword: wrongpass',
    expectedResult: '- Thông báo lỗi chung chung (ví dụ: "Tên đăng nhập hoặc mật khẩu không đúng")\n- Không tiết lộ thông tin hệ thống, stack trace, hay chi tiết nội bộ',
    requirement: 'US-LOGIN-01, AC2',
    technique: 'Error Guessing',
    priority: 'High',
    automation: 'Yes',
  },
];

// ── Build worksheet data ────────────────────────────────────────────────────
const headers = [
  'Test Case ID',
  'Title',
  'Preconditions',
  'Test Steps',
  'Test Data',
  'Expected Result',
  'Requirement',
  'Testing Technique',
  'Priority',
  'Automation',
];

const rows = testCases.map((tc) => [
  tc.id,
  tc.title,
  tc.preconditions,
  tc.steps,
  tc.testData,
  tc.expectedResult,
  tc.requirement,
  tc.technique,
  tc.priority,
  tc.automation,
]);

const wsData = [headers, ...rows];

// ── Create workbook ─────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(wsData);

// Column widths
ws['!cols'] = [
  { wch: 16 },  // Test Case ID
  { wch: 60 },  // Title
  { wch: 45 },  // Preconditions
  { wch: 60 },  // Test Steps
  { wch: 30 },  // Test Data
  { wch: 65 },  // Expected Result
  { wch: 22 },  // Requirement
  { wch: 38 },  // Testing Technique
  { wch: 12 },  // Priority
  { wch: 12 },  // Automation
];

XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

// ── Write file ──────────────────────────────────────────────────────────────
const outPath = resolve(
  __dirname,
  '../working-artifacts/test-cases/TC-US-LOGIN-01-dang-nhap-voi-thong-tin-xac-thuc.xlsx'
);

const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
writeFileSync(outPath, buf);

console.log(`Excel exported: ${outPath}`);
