import {IDataCard, IDataContact} from 'types';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';
import {NavigationService, Routes} from 'navigation';
import {callNumber, sendMail} from 'utils';

export const ACCOUNT_MANAGEMENT: IDataCard[] = [
  {
    title: 'Thông tin cá nhân',
    icon: Icon.Card({}),
    onPress: () => NavigationService.navigate(Routes.AccountInfo),
  },
  {
    title: 'Tài khoản EXC-xu',
    icon: Icon.WalletInfo({}),
    onPress: () => NavigationService.navigate(Routes.BalanceInfo),
  },
  {
    title: 'Nạp EXC-xu',
    icon: Icon.Recharge({}),
    onPress: () => NavigationService.navigate(Routes.Recharge),
  },
  {
    title: 'Điều khoản sử dụng',
    icon: Icon.File({}),
    onPress: () => NavigationService.navigate(Routes.Term),
  },
  {
    title: 'Chính sách bảo mật',
    icon: Icon.GuardFile({}),
    onPress: () => NavigationService.navigate(Routes.Policy),
  },
  {
    title: 'Liên hệ hỗ trợ',
    icon: Icon.Phone({color: Colors.border, width: 24, height: 24}),
    onPress: () => NavigationService.navigate(Routes.Contact),
  },
  {
    title: 'Đổi mật khẩu',
    icon: Icon.Lock({}),
    onPress: () => NavigationService.navigate(Routes.ChangePassword),
  },
  {
    title: 'Yêu cầu xóa tài khoản',
    icon: Icon.DeleteUser({}),
    onPress: () => NavigationService.navigate(Routes.RequestDelete),
  },
];

export const CONTACTS: IDataContact[] = [
  {
    id: 1,
    title: 'CÔNG TY CP TM VÀ DỊCH VỤ EXC-GO',
    icon: Icon.CompanyLocation({}),
  },
  {
    id: 2,
    title: 'Số nhà 6, Ngõ 3, Tổ 6, Phường Phú Lương, Quận Hà Đông, TP Hà Nội',
    icon: Icon.Location({}),
  },
  {
    id: 3,
    title: 'Hotline: +84 909 123456',
    icon: Icon.PhoneSolid({}),
    onPress: () => callNumber('0909123456'),
  },
  {
    id: 4,
    title: 'Email: info@exc-go.com',
    icon: Icon.Envelop({}),
    onPress: () => sendMail('info@exc-go.com'),
  },
  {
    id: 5,
    title: 'Gửi yêu cầu',
    icon: Icon.Send2({}),
    onPress: () => NavigationService.navigate(Routes.RequestSupport),
    isNavigate: true,
  },
];

export const REQUEST_SUPPORT_MSG: string =
  ' sẽ hồi đáp yêu cầu của quý khách trong thời gian sớm nhất. Mọi yêu cầu cần xử lý gấp xin vui lòng liên hệ Hotline: +84 909 123456 để được hỗ trợ.';

export const POLICY: string = `Chúng tôi mong muốn cung cấp nền tảng đánh giá đáng tin cậy và địa
phương hóa nhất ở Đông Nam Á để giúp bạn và cộng đồng người dùng EXC
có thể khám phá những địa điểm tốt nhất để dùng bữa, mua sắm và ghé
thăm dù bạn đang ở đâu. Chúng tôi tin rằng nội dung do người dùng
EXC đóng góp nên được sử dụng một cách có đạo đức và có trách nhiệm,
đồng thời đảm bảo thông tin cá nhân và quyền riêng tư được bảo vệ.
Chúng tôi đã xây dựng Hướng Dẫn Đánh Giá này để bảo vệ người dùng và
đảm bảo nội dung do người dùng tạo sẽ mang lại những trải nghiệm có
ích và tích cực cho mọi người. 1. Các Đánh Giá sẽ được hiển thị công
khai: Khi bạn đăng tải đánh giá trên nền tảng EXC, đánh giá đó sẽ có
thể được truy cập một cách công khai, cùng với tên tài khoản của bạn
và (các) hình ảnh đã tải lên hoặc thông tin nhận diện khác mà bạn
chủ động đề cập trong phần đánh giá của bạn (“Đánh Giá”). Nếu bạn
không thoải mái với việc những người khác (có thể bao gồm những bên
không phải là người dùng EXC) xem Đánh Giá của bạn, vui lòng không
đăng tải Đánh Giá. 2. Các Đánh Giá sẽ ảnh hưởng đến những vấn đề
khác Các bình luận của bạn sẽ có quyền lực nhất định, vì vậy, vui
lòng lưu ý về trách nhiệm xã hội. Để góp phần mang đến trải nghiệm
an toàn và hài lòng cho mọi người, vui lòng rằng bạn cung cấp Các
Đánh Giá thành thật và đúng sự thật mà Các Đánh Giá đó không chứa
bất kỳ nội dung nào sau đây: Nhận xét không phù hợp Nội dung gây
phiền toái (spam) Nội dung giả mạo, lừa đảo hoặc gây hiểu lầm Nội
dung bị hạn chế Nội dung bất hợp pháp Nội dung vi phạm Nội dung
khiêu dâm Nội dung xúc phạm Mạo danh Quảng cáo Bất kỳ dữ liệu cá
nhân nào có thể liên kết trực tiếp hoặc gián tiếp tới các cá nhân
khác. Chúng tôi có quyền, nhưng không phải nghĩa vụ, gỡ bỏ, xóa hoặc
ẩn các Đánh Giá hoặc bất kỳ (các) phần nào của các Đánh Giá nếu các
Đánh Giá này chứa nội dung mà chúng tôi cho là không phù hợp; hoặc
vi phạm bất kỳ (các) luật và/ hoặc (các) quy định nào, bao gồm nhưng
không giới hạn các nội dung được liệt kê ở trên; hoặc các nội dung
không liên quan (ví dụ như các bình luận về chính trị và xã hội).
Bạn sẽ là bên duy nhất chịu trách nhiệm về hệ quả của các Đánh Giá.
Các Đánh Giá chỉ là ý kiến đánh giá của cá nhân liên quan và theo
đó, sự chính xác, khách quan hoặc nội dung của Các Đánh Giá này
không thể được đảm bảo. Trong phạm vi cho phép của pháp luật, chúng
tôi từ bỏ tất cả nghĩa vụ và trách nhiệm phát sinh từ bất kỳ hệ quả
nào dựa trên các thông tin và tất cả điều khoản, tuyên bố, điều kiện
hoặc đảm bảo được ngụ ý trong Hướng Dẫn Đánh Giá sẽ được loại trừ.
Các Đánh Giá này có thể chứa các lỗi về tính xác thực và lỗi đánh
máy; và không được xem như là lời khuyên để tin cậy. Các Đánh Giá
được bạn hoặc các người dùng khác đăng tải, và chúng tôi cố gắng để
giám sát và kiểm duyệt nội dung, chúng tôi không thể đảm bảo rằng
các Đánh Giá là chính xác hoặc tuân thủ với Hướng Dẫn Đánh Giá này.
Bạn là bên sở hữu của các Đánh Giá của bạn, và có thể yêu cầu xóa bỏ
các Đánh Giá Chúng tôi không yêu cầu quyền sở hữu đối với bất kỳ nội
dung nào mà bạn cung cấp cho chúng tôi. Khi bạn tải lên hoặc cung
cấp cho chúng tôi bất kỳ nội dung nào được bảo hộ bởi quyền sở hữu
trí tuệ thì bạn (a) cấp cho EXC quyền miễn phí bản quyền không thể
hủy ngang, vĩnh viễn, phạm vi toàn cầu, không độc quyền, không hạn
chế và giấy phép để tổ chức, lưu trữ, sử dụng, tái sản xuất, sửa
đổi, chỉnh sửa, chuyển thể, dịch, tạo các tác phẩm phái sinh, xuất
bản, trình bày hoặc hiển thị công khai, phân phối, cấp phép lại hoặc
cung cấp cho người khác nội dung của bạn (bao gồm nhưng không giới
hạn tên và/ hoặc hình thức tương tự) ở bất kỳ và tất cả các phương
tiện, định dạng và kênh (đang khả dụng hoặc phát triển sau đó) cho
bất kỳ mục đích nào, bao gồm nhưng không giới hạn mục đích quảng cáo
và thương mại như khuyến mại và phân phối lại một phần hoặc tất cả
các Đánh Giá dưới bất kỳ hình thức và thông qua bất cứ kênh nào như
các nền tảng của một bên thứ ba; và (b) cam kết rằng bạn có quyền
cấp cho chúng tôi giấy phép đó và sẽ tiếp tục chịu trách nhiệm đối
với các Đánh Giá mà bạn đăng tải. Nếu bạn lựa chọn cung cấp phản hồi
cho chúng tôi, ví dụ như đề xuất để cải thiện dịch vụ, chúng tôi có
thể triển khai dựa trên phản hồi của bạn mà không có bất kỳ nghĩa vụ
nào với bạn. Nếu bạn muốn yêu cầu xóa bỏ Đánh Giá, bạn có thể liên
hệ Trung Tâm Trợ Giúp của EXC
(https://help.EXC.com/passenger/vi-vn/) để gửi yêu cầu. Nếu bạn xóa
tài khoản, các Đánh Giá bạn đã gửi có thể vẫn được giữ lại nhưng sẽ
không liên kết đến tài khoản của bạn. Hướng Dẫn Đánh Giá này là một
phần của Hợp Đồng giữa bạn và EXC Bằng việc đăng tải Đánh Giá, bạn
đồng ý với Hướng Dẫn Đánh Giá cùng với Điều khoản Dịch vụ hiện hành
được cung cấp trên www.EXC.com và Thông Báo Bảo Mật tại
https://www.EXC.com/privacy. Bạn cũng thừa nhận rằng bạn sẽ chịu
trách nhiệm và đồng ý bồi hoàn cho EXC và giữ cho chúng tôi hoặc bất
kỳ bên liên kết hoặc người được cấp phép nào và các cán bộ, giám
đốc, nhân viên và đại lý tương ứng của chúng tôi vô hại khỏi và
chống lại, bất kỳ và tất cả các khiếu nại, hành động, trách nhiệm
pháp lý, tổn thất, thiệt hại, các chi phí (bao gồm cả các chi phí
pháp lý hợp lý), mà EXC hoặc bất kỳ bên được bồi hoàn nào khác phải
gánh chịu, phát sinh trực tiếp hoặc gián tiếp từ việc (i) bạn vi
phạm nghĩa vụ, cam đoan hoặc bảo đảm của mình theo Hướng Dẫn Đánh
Giá; (ii) bạn vi phạm hoặc sử dụng sai mục đích bất kỳ luật, quy
định hiện hành nào hoặc bản quyền, quyền sở hữu công nghiệp hoặc các
quyền khác của bất kỳ bên thứ ba nào. EXC có quyền cập nhật Hướng
Dẫn Đánh Giá bất kỳ lúc nào. Để tránh hiểu nhầm, “EXC/chúng tôi” có
nghĩa là EXCtaxi Holdings Pte. Ltd. hoặc bất ký pháp nhân nào kiểm
soát, được kiểm soát bởi, hoặc cùng chịu sự kiểm soát, trực tiếp
hoặc gián tiếp, trực tiếp hoặc gián tiếp, bởi pháp nhân nói trên,
tùy từng thời điểm (nhưng chỉ áp dụng trong khoảng thời gian mà sự
kiểm soát tồn tại) Trong trường hợp có bất cứ sự không đồng nhất nào
giữa phiên bản tiếng Anh và các ngôn ngữ khác của Hướng Dẫn Đánh
Giá, phiên bản tiếng Anh sẽ được áp dụng đối với phần nội dung không
đồng nhất. Bạn có thể gửi thắc mắc hoặc báo cáo những nội dung không
phù hợp đến EXC Bạn có thể báo cáo các nội dung không phù hợp hoặc
bất hợp pháp đến EXC thông qua các kênh khả dụng dưới đây: Nếu bạn
tin rằng bất kỳ nội dung nào được cung cấp trên nền tảng của chúng
tôi vi phạm quyền sở hữu trí tuệ của bạn, bạn có thể thông báo cho
chúng tôi bằng cách gửi email (với đầy đủ bằng chứng về quyền sở hữu
tài sản trí tuệ của bạn cũng như đính kèm ảnh chụp màn hình và mô tả
về việc vi phạm) tới đại diện được chỉ định của chúng tôi: Tên: Cố
vấn pháp lý của EXC về sở hữu trí tuệ, địa chỉ: 6 Battery Road #
38-04 Singapore 049909, e-mail: infringements@EXC.com. Bằng cách gửi
email đến infringements@EXC.com, bạn xác nhận rằng bạn đang bắt đầu
một quy trình pháp lý một cách thiện chí và hiểu rằng bất kỳ thông
báo gian lận và/ hoặc lạm dụng nào đều có thể dẫn đến hậu quả pháp
lý. Liên quan đến các nội dung bất hợp pháp hoặc không phù hợp khác,
bạn có thể báo cáo đến EXC thông qua
https://help.EXC.com/passenger/vi-vn/.`;
