export const userProfile = {
  std_id: 1,
  std_no: '63543206030-9',
  first_name: 'Kendra',
  last_name: 'Spence',
  email: 'dimita6440@watrf.com',
  curriculum_id: 2,
  std_group_id: 2
}
export const studyPlanForSimulator = [
  {
    plan_name: 'ตัวอย่างแผนการเรียน Software Engineering ปี 2566',
    plan_data: [
      {
        term: 1,
        subject_id: 9,
        curriculum_id: 2,
        subject_group_id: 3,
        subject_code: 'GEBIN705',
        subject_name_th: 'แก่นวิศวกรรมซอฟต์แวร์',
        subject_name_en: 'Software Engineering Essentials',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับภาพรวมของวิศวกรรมซอฟต์แวร์ ฮาร์ดแวร์และซอฟต์แวร์ ศึกษากระบวนการพัฒนาซอฟต์แวร์ ประเภทซอฟต์แวร์และการใช้งาน (ซอฟต์แวร์ระบบและเทคโนโลยีสารสนเทศ ซอฟต์แวร์ระบบและการควบคุม) การประมวลผล อัลกอริทึม กระบวนงาน (Flow Chart) และการโปรแกรม เครือข่ายคอมพิวเตอร์และอินเตอร์เน็ตทุกสรรพสิ่ง ระบบฐานข้อมูล ภาพรวมปัญญาประดิษฐ์และหุ่นยนต์ ระบบฝังตัว ซอฟต์แวร์ในงานอุตสาหกรรม และประยุกต์ใช้ซอฟต์แวร์ การควบคุมคุณภาพซอฟต์แวร์และกระบวนการปรับปรุงอย่างต่อเนื่อง',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:49.000+00:00',
        updated_at: '2024-01-19T21:23:49.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 9,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 3,
            subject_id: 9,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:05.000+00:00',
            updated_at: '2024-01-19T21:25:05.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 3,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาบูรณาการ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:42.000+00:00',
              updated_at: '2024-01-19T21:23:42.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 1,
        curriculum_id: 2,
        subject_group_id: 1,
        subject_code: 'GEBLC101',
        subject_name_th: 'ภาษาอังกฤษเพื่อการสื่อสารในชีวิตประจำวัน',
        subject_name_en: 'English for Everyday Communication',
        subject_credit: 3,
        subject_description:
          'ศึกษาคำศัพท์ สำนวน โครงสร้างภาษาอังกฤษพัฒนาทักษะการใช้ภาษาอังกฤษด้านการฟัง พูด อ่าน เขียนเพื่อใช้ในการสื่อสารในชีวิตประจำวันในบริบททางสังคมและวัฒนธรรมต่างๆ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:47.000+00:00',
        updated_at: '2024-01-19T21:23:47.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 1,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 1,
            subject_id: 1,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:03.000+00:00',
            updated_at: '2024-01-19T21:25:03.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 1,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาภาษาและการสื่อสาร',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:41.000+00:00',
              updated_at: '2024-01-19T21:23:41.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 4,
        curriculum_id: 2,
        subject_group_id: 1,
        subject_code: 'GEBLC201 ',
        subject_name_th: 'ศิลปะการใช้ภาษาไทย',
        subject_name_en: 'Arts of Using Thai Language',
        subject_credit: 3,
        subject_description:
          'ศึกษารูปแบบและวิธีการสื่อสารด้วยการใช้ภาษาไทยอย่างมีประสิทธิภาพ พัฒนากระบวนการคิดอย่างมีระบบร่วมกับการสื่อสารอย่างสร้างสรรค์ โดยมีศิลปะในการฟัง การอ่าน การพูด และการเขียนเหมาะสมกับทักษะในศตวรรษที่ 21 ใช้ภาษาไทยในฐานะที่เป็นมรดกทางวัฒนธรรมของชาติ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:48.000+00:00',
        updated_at: '2024-01-19T21:23:48.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 4,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 1,
            subject_id: 4,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:04.000+00:00',
            updated_at: '2024-01-19T21:25:04.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 1,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาภาษาและการสื่อสาร',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:41.000+00:00',
              updated_at: '2024-01-19T21:23:41.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 30,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE200',
        subject_name_th: 'วิศวกรรมซอฟต์แวร์เบื้องต้น',
        subject_name_en: 'Introduction to Software Engineering',
        subject_credit: 3,
        subject_description:
          'ศึกษาพื้นฐานวิศวกรรมซอฟต์แวร์ แนะนำกระบวนการพัฒนาซอฟต์แวร์ และวงจรชีวิตการพัฒนาซอฟต์แวร์  โดยเฉพาะแบบจำลองการพัฒนาแบบวนรอบและเพิ่มพูนโดยใช้วิธีพัฒนาโปรแกรมเชิงอ็อบเจกต์ หัวข้อที่มีการสอนได้แก่ การเก็บรวบรวมความต้องการของผู้ใช้ การวิเคราะห์และออกแบบระบบโดยใช้ยูเอ็มแอล (UML) การทดสอบระบบ เฟรมเวิร์คและ  เอพีไอ สถาปัตยกรรมแบบ client-server การวิเคราะห์ ออกแบบและพัฒนาระบบ client-server อย่างง่าย และเทคโนโลยีที่เกี่ยวข้องกับส่วนต่อประสานกับผู้ใช้นอกจากนี้ยังแนะนำกลยุทธ์การพัฒนาซอฟต์แวร์สมัยใหม่ เช่น  Unified Process, Personal Software Process, Extreme Programming และ Agile Programming.',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:55.000+00:00',
        updated_at: '2024-01-19T21:23:55.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 30,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 30,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:11.000+00:00',
            updated_at: '2024-01-19T21:25:11.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 31,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE201',
        subject_name_th: 'กฎหมายและจริยธรรมด้านเทคโนโลยีสารสนเทศ',
        subject_name_en: 'Laws and Ethics in information Technology',
        subject_credit: 1,
        subject_description:
          'ศึกษาด้านจริยธรรมและกฎหมายในเทคโนโลยีสารสนเทศ แนวปฏิบัติด้านจริยธรรมทางเทคโนโลยีสารสนเทศ ประเด็นทางสังคมของคอมพิวเตอร์และการพัฒนาซอฟต์แวร์ ทรัพย์สินทางปัญญา ความเป็นส่วนตัว ความปลอดภัยทางซอฟต์แวร์ อาชญากรรมและนิติคอมพิวเตอร์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:55.000+00:00',
        updated_at: '2024-01-19T21:23:55.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 31,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 31,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:12.000+00:00',
            updated_at: '2024-01-19T21:25:12.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 29,
        curriculum_id: 2,
        subject_group_id: 16,
        subject_code: 'ENGCC304',
        subject_name_th: 'การเขียนโปรแกรมคอมพิวเตอร์',
        subject_name_en: 'Computer Programming',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติเกี่ยวกับองค์ประกอบคอมพิวเตอร์,การปฏิสัมพันธ์ระหว่างฮาร์ดแวร์กับซอฟต์แวร์,ชนิดข้อมูล,อัลกอริทึม, รหัสเทียม และผังงาน,ตัวดำเนินการ,คำสั่งควบคุมแบบทางเลือก,คำสั่งควบคุมแบบวนรอบ,ตัวแปรชุด, ฟังก์ชัน, การประยุกต์ใช้เพื่อแก้ปัญหาในงานทางวิศวกรรม,แนวโน้มภาษาคอมพิวเตอร์สมัยใหม่',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:55.000+00:00',
        updated_at: '2024-01-19T21:23:55.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 29,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 16,
            subject_id: 29,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:11.000+00:00',
            updated_at: '2024-01-19T21:25:11.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 16,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาพื้นฐานวิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:45.000+00:00',
              updated_at: '2024-01-19T21:23:45.000+00:00'
            }
          }
        ]
      },
      {
        term: 1,
        subject_id: 47,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE217',
        subject_name_th: 'การสื่อสารข้อมูลและเครือข่าย',
        subject_name_en: 'Data Communication and Networks',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติเกี่ยวกับพื้นฐานของการสื่อสารข้อมูล สถาปัตยกรรมเครือข่ายคอมพิวเตอร์  เน้น Physical  Datalink layer ทฤษฎีเครือข่ายท้องถิ่น เครือข่ายแบบวงกว้าง เครือข่ายแบบเสมือน โปรโตคอล TCP/IP การอ้างแอดเดรสแบบ IP การทำซับเน็ต การค้นหาเส้นทางแบบต่าง ๆ การตั้งค่าอุปกรณ์โดยใช้เราท์เตอร์และสวิตช์ชิงในการให้บริการสื่อสารข้อมูลแบบมีสายและไร้สาย โดยอาศัยโปรแกรมจำลองสถานการณ์',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:00.000+00:00',
        updated_at: '2024-01-19T21:24:00.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 47,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 47,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:16.000+00:00',
            updated_at: '2024-01-19T21:25:16.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 2,
        curriculum_id: 2,
        subject_group_id: 1,
        subject_code: 'GEBLC103',
        subject_name_th: 'ภาษาอังกฤษเชิงวิชาการ',
        subject_name_en: 'Academic English',
        subject_credit: 3,
        subject_description:
          'ศึกษาคำศัพท์ สำนวน โครงสร้างภาษาอังกฤษ โดยเน้นหลักการฟัง การพูด การอ่าน การเขียน การสรุปความ และการนำเสนอในบริบททางวิชาการ ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:47.000+00:00',
        updated_at: '2024-01-19T21:23:47.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 2,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 1,
            subject_id: 2,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:04.000+00:00',
            updated_at: '2024-01-19T21:25:04.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 1,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาภาษาและการสื่อสาร',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:41.000+00:00',
              updated_at: '2024-01-19T21:23:41.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 7,
        curriculum_id: 2,
        subject_group_id: 3,
        subject_code: 'GEBIN702',
        subject_name_th: 'นวัตกรรมและเทคโนโลยี',
        subject_name_en: 'Innovation and Technology',
        subject_credit: 3,
        subject_description:
          'ศึกษาการเปลี่ยนแปลงทางสังคมและวิวัฒนาการทางด้านวิทยาศาสตร์และเทคโนโลยี  กระบวนการสร้างและออกแบบนวัตกรรมและเทคโนโลยี ความสัมพันธ์ระหว่างมนุษย์  กับนวัตกรรมและเทคโนโลยี ผลกระทบของนวัตกรรมและเทคโนโลยีต่อสังคมและสิ่งแวดล้อม ฝึกกระบวนการออกแบบนวัตกรรมที่สอดคล้องกับมนุษย์ในปัจจุบัน ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:49.000+00:00',
        updated_at: '2024-01-19T21:23:49.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 7,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 3,
            subject_id: 7,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:05.000+00:00',
            updated_at: '2024-01-19T21:25:05.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 3,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาบูรณาการ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:42.000+00:00',
              updated_at: '2024-01-19T21:23:42.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 48,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE218',
        subject_name_th: 'โครงสร้างและสถาปัตยกรรมคอมพิวเตอร์',
        subject_name_en: 'Computer Architecture and Organization',
        subject_credit: 3,
        subject_description:
          'ศึกษาและปฏิบัติการเกี่ยวกับโครงสร้างและสถาปัตยกรรมคอมพิวเตอร์ พีชคณิตบูลีนและดิจิทัลตรรกะ รูปแบบการ แทนข้อมูล รูปแบบคาสั่ง หน่วยประมวลผลกลาง ชุดคำสั่ง หน่วยควบคุมและเส้นทางข้อมูล ไปป์ไลน์ ลำดับขั้นของหน่วยความจำ บัส การเชื่อมต่อและสื่อสารกับช่องรับส่งข้อมูล อุปกรณ์ต่อพ่วง หลักการออกแบบ การประเมินประสิทธิภาพ หน่วยประมวลผลแบบหลายแกน ระบบประมวลผลแบบหลายตัว ระบบประมวลผลประสิทธิภาพสูงและการเชื่อมต่อ',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:00.000+00:00',
        updated_at: '2024-01-19T21:24:00.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 48,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 48,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:16.000+00:00',
            updated_at: '2024-01-19T21:25:16.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 32,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE202',
        subject_name_th: 'ระบบปฏิบัติการและการจัดโครงแบบเครื่องแม่ข่าย',
        subject_name_en: 'Operating System and Server Configure',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติการเกี่ยวกับหลักการพื้นฐานการจัดการงานของระบบปฏิบัติติการ การวิเคราะห์ปริมาณงานเพื่อเตรียมเครื่องแม่ข่าย การติดตั้งระบบปฏิบัติการในเครื่องแม่ข่ายเพื่อเตรียมแม่ข่ายศูนย์กลางข้อมูล แม่ข่ายบริการแฟ้มข้อมูล และแม่ข่ายในระบบอินเทอร์เน็ต โดยใช้ระบบปฏิบัติการยูนิกซ์ หรือระบบปฏิบัติการวินโดว์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:56.000+00:00',
        updated_at: '2024-01-19T21:23:56.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 32,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 32,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:12.000+00:00',
            updated_at: '2024-01-19T21:25:12.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 46,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE216',
        subject_name_th: 'โครงสร้างข้อมูลและขั้นตอนวิธี',
        subject_name_en: 'Data Structures and Algorithms',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติการเกี่ยวกับการแทนข้อมูล โครงสร้างและการออกแบบข้อมูลแบบอาร์เรย์ สแต็ก คิว ลิงค์ลิสต์ ต้นไม้ กราฟ การจัดเรียงข้อมูล การค้นหาข้อมูล รูปแบบ และวิธีการของขั้นตอนวิธีแบบต่าง ๆ การวัดความซับซ้อนของขั้นตอนวิธี หลักการ และแนวคิดของการทางานแบบการเวียนเกิด และมีปฏิบัติการการประยุกต์ใช้ โครงสร้างข้อมูลชนิดต่าง ๆ ในการแก้ไขปัญหา  ',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:00.000+00:00',
        updated_at: '2024-01-19T21:24:00.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 46,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 46,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:16.000+00:00',
            updated_at: '2024-01-19T21:25:16.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 2,
        subject_id: 33,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE203',
        subject_name_th: 'การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์',
        subject_name_en: 'Computer Programming for Software Engineer',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติการเกี่ยวกับเทคโนโลยีของการพัฒนาโปรแกรมทั้งการทำงานของส่วนหน้าและส่วนหลัง  และเทคโนโลยีการพัฒนาโปรแกรมแบบผสมผสานที่ต่างแพลตฟอร์ม หลักการเขียนโปรแกรมเชิงลึกที่เกี่ยวข้องกับภาษาและกรอบภาษาที่เหมาะสมกับสถานการณ์ปัจจุบัน การพัฒนาส่วนติดต่อกับผู้ใช้ การทดสอบซอฟต์แวร์ เครื่องมือที่ใช้ในการพัฒนาซอฟต์แวร์ ระบบควบคุมเวอร์ชั่น',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:56.000+00:00',
        updated_at: '2024-01-19T21:23:56.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 33,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 33,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:12.000+00:00',
            updated_at: '2024-01-19T21:25:12.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 5,
        curriculum_id: 2,
        subject_group_id: 2,
        subject_code: 'GEBHT601',
        subject_name_th: 'กิจกรรมเพื่อสุขภาพ',
        subject_name_en: 'Activities for Health',
        subject_credit: 3,
        subject_description:
          'ศึกษาและปฏิบัติการเกี่ยวกับพลศึกษาและสุขภาพ โภชนาการ พฤติกรรมการบริโภคและการควบคุมน้ำหนัก การปฐมพยาบาลเบื้องต้น วิทยาศาสตร์การกีฬา สมรรถภาพทางกาย การจัดโปรแกรมการออกกำลังกายและฝึกปฏิบัติกิจกรรมการออกกำลังกายเพื่อสุขภาพ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:48.000+00:00',
        updated_at: '2024-01-19T21:23:48.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 5,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 2,
            subject_id: 5,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:04.000+00:00',
            updated_at: '2024-01-19T21:25:04.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 2,
              subject_type_id: 1,
              subject_group_name: 'กลุ่มวิชาสุภาพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:41.000+00:00',
              updated_at: '2024-01-19T21:23:41.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 27,
        curriculum_id: 2,
        subject_group_id: 16,
        subject_code: 'ENGSE101',
        subject_name_th: 'คณิตศาสตร์ดิสครีต',
        subject_name_en: 'Discrete Mathematics',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับพื้นฐานคณิตศาสตร์ดิสครีต ตรรกศาสตร์ เทคนิคการพิสูจน์ การให้เหตุผลเชิงคณิตศาสตร์ ทฤษฎีของเซต ความสัมพันธ์ ฟังก์ชั่น เทคนิคการนับ รีเคอร์ชัน ทฤษฎีกราฟและต้นไม้ การประยุกต์ใช้ในงานวิศวกรรม',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:54.000+00:00',
        updated_at: '2024-01-19T21:23:54.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 27,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 16,
            subject_id: 27,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:10.000+00:00',
            updated_at: '2024-01-19T21:25:10.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 16,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาพื้นฐานวิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:45.000+00:00',
              updated_at: '2024-01-19T21:23:45.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 34,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE204',
        subject_name_th: 'การเขียนโปรแกรมเชิงวัตถุ',
        subject_name_en: 'Object-Oriented Programming',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติ องค์ประกอบของการเขียนโปรแกรมตามแนวคิดเชิงวัตถุ เช่น สิ่งที่เป็นนามธรรม โมดูล การนำโค้ดกลับมาใช้ซ้ำ อ็อบเจ็กต์ คลาส การส่งผ่านข้อความระหว่างวัตถุ เมธอด อินเทอร์เฟส การห่อหุ้ม โพลีมอร์ฟิซึม การสืบทอดคุณสมบัติ เป็นต้น ฝึกปฏิบัติการเขียนโปรแกรมด้วยเครื่องมือที่ง่ายต่อการสร้างโปรแกรม และบำรุงรักษาโปรแกรม เพื่อศึกษาการเรียกใช้งานไลบรารีฟังก์ชันและเอพีไอของภาษาคอมพิวเตอร์ที่สนับสนุนการเขียนโปรแกรมเชิงวัตถุ โดยการใช้ส่วนติดต่อประสานโปรแกรมประยุกต์ (API)',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:56.000+00:00',
        updated_at: '2024-01-19T21:23:56.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 34,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 34,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:12.000+00:00',
            updated_at: '2024-01-19T21:25:12.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 35,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE205',
        subject_name_th: 'กระบวนการซอฟต์แวร์และการประกันคุณภาพ',
        subject_name_en: 'Software Process and Quality Assurance',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติเกี่ยวกับการวิเคราะห์แบบจำลองของกระบวนการการพัฒนาซอฟต์แวร์ แบบจำลองและมาตรฐานของวัฏจักร กระบวนการพัฒนา สภาพแวดล้อมและกรอบของการปรับปรุงกระบวนการผลิต การนำกระบวนการผลิตไปใช้ในองค์กร โครงการ ทีม และบุคคล ในแบบต่าง ๆกัน การวัดและการวิเคราะห์กระบวนการพัฒนาซอฟต์แวร์ ประโยชน์ที่ได้ต่อธุรกิจ ศึกษาแนวคิดเกี่ยวกับคุณภาพซอฟต์แวร์ วิธีการประกันคุณภาพซอฟต์แวร์ การวางแผนและการทำการประกันคุณภาพซอฟต์แวร์และกลยุทธ์  มาตรฐานคุณภาพ  วิธีการพิชญพิจารณ์ การทบทวน การตรวจดูการทำงาน และการตรวจตราอย่างละเอียด การแบ่งระดับหน่วยและการทดสอบระดับหน่วย ความน่าเชื่อถือของซอฟต์แวร์ การจัดการความรับผิดชอบในการประกันคุณภาพ และกรณีศึกษา',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:57.000+00:00',
        updated_at: '2024-01-19T21:23:57.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 35,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 35,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:13.000+00:00',
            updated_at: '2024-01-19T21:25:13.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 49,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE219',
        subject_name_th: 'ระบบฐานข้อมูล',
        subject_name_en: 'Database System',
        subject_credit: 3,
        subject_description:
          'ศึกษาและปฏิบัติการเกี่ยวกับ ระบบฐานข้อมูล แบบจำลองข้อมูลและทฤษฎีการออกแบบฐานข้อมูลเชิงสัมพันธ์ ภาษาจัดการฐานข้อมูล ข้อจำกัด วิวและอินเด็กซ์ การโปรแกรมฐานข้อมูล การสำรองข้อมูลและการฟื้นสภาพ ความปลอดภัยและการกำหนดสิทธิ การควบคุมภาวะพร้อมกัน แนวโน้มใหม่ในระบบฐานข้อมูล',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:00.000+00:00',
        updated_at: '2024-01-19T21:24:00.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 49,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 49,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:17.000+00:00',
            updated_at: '2024-01-19T21:25:17.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 3,
        subject_id: 26,
        curriculum_id: 2,
        subject_group_id: 16,
        subject_code: 'ENGSE100',
        subject_name_th: 'ความน่าจะเป็นและสถิติในงานวิศวกรรม',
        subject_name_en: 'Probability and Statistics for Engineering',
        subject_credit: 3,
        subject_description:
          'ศึกษา สถิติเชิงพรรณนา ทฤษฎีความน่าจะเป็นเบื้องต้น ตัวแปรสุ่มและการแจกแจงความน่าจะเป็นที่สำคัญ ประชากรและตัวอย่างสุ่ม ทฤษฎีบทขีดจำกัดกลาง การแจกแจงของตัวอย่างสุ่ม สถิติเชิงอนุมาน การวิเคราะห์สหสัมพันธ์และการวิเคราะห์การถดถอย ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:54.000+00:00',
        updated_at: '2024-01-19T21:23:54.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 26,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 16,
            subject_id: 26,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:10.000+00:00',
            updated_at: '2024-01-19T21:25:10.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 16,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาพื้นฐานวิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:45.000+00:00',
              updated_at: '2024-01-19T21:23:45.000+00:00'
            }
          }
        ]
      },
      {
        term: 4,
        subject_id: 10,
        curriculum_id: 2,
        subject_group_id: 5,
        subject_code: 'GEBSC301',
        subject_name_th: 'เทคโนโลยีสารสนเทศที่จำเป็นในชีวิตประจำวัน',
        subject_name_en: 'Necessary Information Technology in Daily Life',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับความหมาย ความสำคัญ องค์ประกอบของเทคโนโลยีสารสนเทศ เครือข่ายอินเทอร์เน็ต สื่อดิจิทัล สื่อสังคมออนไลน์ พาณิชย์อิเล็กทรอนิกส์ อินเทอร์เน็ตของสรรพสิ่ง ปัญญาประดิษฐ์ การใช้เทคโนโลยีสื่อประสม และการใช้โปรแกรมสำเร็จรูปที่จำเป็นเบื้องต้น ความปลอดภัยในการใช้เทคโนโลยีสารสนเทศ กฎหมายการกระทำความผิดเกี่ยวกับคอมพิวเตอร์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:50.000+00:00',
        updated_at: '2024-01-19T21:23:50.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 10,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 5,
            subject_id: 10,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:06.000+00:00',
            updated_at: '2024-01-19T21:25:06.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 5,
              subject_type_id: 2,
              subject_group_name: 'กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:42.000+00:00',
              updated_at: '2024-01-19T21:23:42.000+00:00'
            }
          }
        ]
      },
      {
        term: 4,
        subject_id: 19,
        curriculum_id: 2,
        subject_group_id: 4,
        subject_code: 'GEBSO503',
        subject_name_th: 'มนุษยสัมพันธ์',
        subject_name_en: 'Human Relations',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับความรู้พื้นฐานและความสำคัญของมนุษยสัมพันธ์ การศึกษาเกี่ยวกับธรรมชาติและพฤติกรรมของมนุษย์ ทฤษฎีที่เกี่ยวข้องกับมนุษยสัมพันธ์ในชีวิตประจำวันและการทำงาน มนุษยสัมพันธ์กับความเป็นผู้นำ การบริหารความขัดแย้ง  การติดต่อสื่อสารเพื่อสร้างมนุษยสัมพันธ์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:52.000+00:00',
        updated_at: '2024-01-19T21:23:52.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 19,
            subject_category_id: 1,
            subject_type_id: null,
            subject_group_id: 4,
            subject_id: 19,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:08.000+00:00',
            updated_at: '2024-01-19T21:25:08.000+00:00',
            subjectCategory: {
              subject_category_id: 1,
              subject_category_name: 'หมวดวิชาศึกษาทั่วไป',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 4,
              subject_type_id: 2,
              subject_group_name: 'กลุ่มวิชาบูรณาการ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:42.000+00:00',
              updated_at: '2024-01-19T21:23:42.000+00:00'
            }
          }
        ]
      },
      {
        term: 4,
        subject_id: 28,
        curriculum_id: 2,
        subject_group_id: 16,
        subject_code: 'ENGSE102',
        subject_name_th: 'พีชคณิตเชิงเส้นสำหรับวิศวกรรม ',
        subject_name_en: 'Linear Algebra for Engineering',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับเมทริกซ์ ตัวกำหนด การดำเนินการตามแถว ระบบสมการเชิงเส้น เวกเตอร์ ผลคูณเชิงสเกลลาร์ ผลคูณเชิงเวกเตอร์ ปริภูมิเวกเตอร์ การแปลงเชิงเส้น เมทริกซ์ของการแปลงเชิงเส้น การใช้ซอฟต์แวร์สำเร็จรูปเพื่อแก้ปัญหาทางพีชคณิตเชิงเส้น',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:55.000+00:00',
        updated_at: '2024-01-19T21:23:55.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 28,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 16,
            subject_id: 28,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:11.000+00:00',
            updated_at: '2024-01-19T21:25:11.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 16,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาพื้นฐานวิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:45.000+00:00',
              updated_at: '2024-01-19T21:23:45.000+00:00'
            }
          }
        ]
      },
      {
        term: 4,
        subject_id: 36,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE206',
        subject_name_th: 'การกำหนดความต้องการและการออกแบบทางซอฟต์แวร์',
        subject_name_en: 'Software Requirements Specification and Design',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติ การจัดการความต้องการของผู้ใช้และการออกแบบซอฟต์แวร์  โดยมีเนื้อหาประกอบด้วย การเก็บรวบรวม การวิเคราะห์ การต่อรอง การระบุรายละเอียด การทดสอบ บริหารจัดการความต้องการ แนะนำวิธีการ เทคนิคและเครื่องมือในการบันทึกเอกสารความต้องการ    กลยุทธ์การออกแบบ การออกแบบสถาปัตยกรรม การออกแบบ การปฏิสัมพันธ์กับมนุษย์ ออกแบบรายละเอียด และการประเมินผลการออกแบบ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:57.000+00:00',
        updated_at: '2024-01-19T21:23:57.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 36,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 36,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:13.000+00:00',
            updated_at: '2024-01-19T21:25:13.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 4,
        subject_id: 37,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE207',
        subject_name_th: 'สถาปัตยกรรมซอฟต์แวร์',
        subject_name_en: 'Software Architecture  ',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติเกี่ยวกับพื้นฐานของสถาปัตยกรรมซอฟต์แวร์ อันได้แก่หลักการพื้นฐานและแนวทางในการออกแบบสถาปัตยกรรมซอฟต์แวร์รูปแบบและกรอบแนวคิดต่าง ๆของสถาปัตยกรรมซอฟต์แวร์   วิธีการ เทคนิคและเครื่องมือสำหรับการการใช้เอกสารอธิบายสถาปัตยกรรมซอฟต์แวร์อย่างสมเหตุสมผล การออกแบบสถาปัตยกรรมซอฟต์แวร์และกระบวนการประเมินผล ศึกษาวิธีการและเครื่องมือสำหรับการออกแบบและประเมินสถาปัตยกรรมซอฟต์แวร์ สำหรับสถานะของเทคโนโลยีที่ทันสมัยเช่นการประมวลผลแบบคลาวด์และการประมวลผลสำหรับอุปกรณ์เคลื่อนที่',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:57.000+00:00',
        updated_at: '2024-01-19T21:23:57.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 37,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 37,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:13.000+00:00',
            updated_at: '2024-01-19T21:25:13.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 5,
        subject_id: 38,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE208',
        subject_name_th: 'การวิเคราะห์และออกแบบระบบ',
        subject_name_en: 'System Analysis and Design',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับ ระบบสารสนเทศ วงจรการพัฒนาระบบ วิธีวิเคราะห์ระบบ การศึกษาความเป็นไปได้ของระบบ ระบบธุรกิจ แผนภาพแสดงการไหลของข้อมูล คำอธิบายการประมวลผล ผังแสดงการตัดสินใจ แผนภาพแสดงความสัมพันธ์ของข้อมูล พจนานุกรมข้อมูล ผังโครงสร้าง การอกแบบส่วนรับข้อมูล การออกแบบส่วนแสดงผลข้อมูล การออกแบบส่วนติดต่อกับผู้ใช้ เครื่องมือในการพัฒนาซอฟต์แวร์ มาตรฐานของซอฟต์แวร์ การจัดการข้อจำกัดเชิงวิศวกรรม กระบวนการผลิตซอฟต์แวร์ กระบวนการทดสอบและประเมินคุณภาพของซอฟต์แวร์ การสร้างหน่วยทดสอบ การบริหารโครงการ การทำเอกสารประกอบ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:57.000+00:00',
        updated_at: '2024-01-19T21:23:57.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 38,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 38,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:14.000+00:00',
            updated_at: '2024-01-19T21:25:14.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 5,
        subject_id: 40,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE210',
        subject_name_th: 'การจัดการโครงการซอฟต์แวร์',
        subject_name_en: 'Software Project Management',
        subject_credit: 3,
        subject_description:
          'ศึกษาเกี่ยวกับโครงการและการจัดการโครงการ วัฏจักรของการจัดการโครงการกลุ่มของกระบวนการในการจัดการโครงการ การจัดการการบูรณาการของโครงการ การจัดการขอบเขต การจัดการเวลา การจัดการค่าใช้จ่าย การจัดการคุณภาพ การจัดการทรัพยากรมนุษย์ การจัดการการสื่อสาร การจัดการความเสี่ยง การจัดการการจัดซื้อจัดหา การจัดการผู้มีส่วนได้ส่วนเสีย',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:58.000+00:00',
        updated_at: '2024-01-19T21:23:58.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 40,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 40,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:14.000+00:00',
            updated_at: '2024-01-19T21:25:14.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 5,
        subject_id: 41,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE211',
        subject_name_th: 'สัมมนาทางวิศวกรรมซอฟต์แวร์',
        subject_name_en: 'Seminar in Software Engineering',
        subject_credit: 1,
        subject_description:
          'สัมมนาเรื่องต่าง ๆ ที่น่าสนใจทางวิศวกรรมซอฟต์แวร์   ฝึกปฏิบัติการเกี่ยวกับการค้นคว้าบทความ งานวิจัย สิ่งประดิษฐ์ นวัตกรรม หรืองานทางวิศวกรรมซอฟต์แวร์ การตั้งชื่อโครงงาน วิธีการเขียนรายงาน ความเป็นมาของปัญหา วัตถุประสงค์ ขอบเขต ขั้นตอนและแผนการดำเนินงาน การจัดเตรียมวัสดุและอุปกรณ์ การรวบรวมและวิเคราะห์ข้อมูล การรายงานความก้าวหน้า และการนำเสนอโครงงาน',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:58.000+00:00',
        updated_at: '2024-01-19T21:23:58.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 41,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 41,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:14.000+00:00',
            updated_at: '2024-01-19T21:25:14.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 5,
        subject_id: 43,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE213',
        subject_name_th: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง',
        subject_name_en: 'Artificial Intelligence and Machine Learning',
        subject_credit: 3,
        subject_description:
          'ศึกษาและฝึกปฏิบัติเกี่ยวกับ การเรียนรู้ของเครื่องและทฤษฎีการเรียนรู้ พีชคณิตเชิงเส้นที่จำเป็น ได้แก่ เวกเตอร์ เมทริกซ์ การแปลงเชิงเส้น ค่าและเวกเตอร์ลักษณะเฉพาะ การเรียนรู้แบบมีผู้สอน  การแบ่งประเภท  การถดถอย ค่าผิดปกติ ซัพพอร์ตเวกเตอร์แมชชีน การเลือกแบบจำลองและคุณลักษณะ การลดขนาดมิติของข้อมูล ต้นไม้ตัดสินใจ การเรียนรู้แบบไม่มีผู้สอน การจัดกลุ่ม การเรียนรู้แบบเสริมกำลัง ข่ายงานประสาทเทียม การเรียนรู้เชิงลึก การประยุกต์ใช้ในงานเชิงปัญญาประดิษฐ์ เช่น การประมวลภาพและภาษา',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:59.000+00:00',
        updated_at: '2024-01-19T21:23:59.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 43,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 43,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:15.000+00:00',
            updated_at: '2024-01-19T21:25:15.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 6,
        subject_id: 39,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE209',
        subject_name_th: 'วิวัฒนาการซอฟต์แวร์และการบำรุงรักษา',
        subject_name_en: 'Software Evolution and Maintenance',
        subject_credit: 3,
        subject_description:
          'ศึกษาวิวัฒนาการของซอฟต์แวร์และผลกระทบของ วิวัฒนาการซอฟต์แวร์ พื้นฐานการบำรุงรักษาซอฟต์แวร์ กระบวนการและกิจกรรมการบำรุงรักษาซอฟต์แวร์ ประเด็นด้านเทคนิค เครื่องมือ และการจัดการการบำรุงรักษา การจัดการโครงแบบซอฟต์แวร์ในการบำรุงรักษา การจัดทำเอกสาร เทคนิคโปรแกรมคอมพรีเฮนชัน แบบรูปการออกแบบ การปรับรื้อระบบ การวิศวกรรมย้อนกลับเพื่อการบำรุงรักษา โค้ดรีแฟคเทอริงเครื่องมือในการบำรุงรักษา การบำรุงรักษาซอฟต์แวร์ในโดเมนต่าง ๆ',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:58.000+00:00',
        updated_at: '2024-01-19T21:23:58.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 39,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 39,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:14.000+00:00',
            updated_at: '2024-01-19T21:25:14.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 6,
        subject_id: 42,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE212',
        subject_name_th: 'โครงงานทางวิศวกรรมซอฟต์แวร์ ',
        subject_name_en: 'Senior Project in Software Engineering ',
        subject_credit: 3,
        subject_description:
          'ฝึกปฏิบัติกระบวนการซอฟต์แวร์ ศึกษาวิเคราะห์ความต้องการ ออกแบบ พัฒนาระบบซอฟต์แวร์  จัดทำปริญญานิพนธ์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:58.000+00:00',
        updated_at: '2024-01-19T21:23:58.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 42,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 42,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:15.000+00:00',
            updated_at: '2024-01-19T21:25:15.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 6,
        subject_id: 44,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE214',
        subject_name_th: 'ความมั่นคงปลอดภัยทางไซเบอร์เบื้องต้น',
        subject_name_en: 'Introduction to Cyber Security',
        subject_credit: 3,
        subject_description:
          'ศึกษาและปฏิบัติติพื้นฐานด้านความปลอดภัยทางไซเบอร์ หลักการเกี่ยวกับความมั่นคงปลอดภัยของระบบคอมพิวเตอร์และสารสนเทศ วิธีการปกป้องระบบปฏิบัติการคอมพิวเตอร์ ระบบเครือข่ายและข้อมูลจากการโจมตีทางไซเบอร์ วิธีตรวจสอบระบบและรับมือเมื่อเกิดภัยทางไซเบอร์  รวมถึงการปกป้องความเป็นส่วนตัวของผู้ใช้งาน',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:59.000+00:00',
        updated_at: '2024-01-19T21:23:59.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 44,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 44,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:15.000+00:00',
            updated_at: '2024-01-19T21:25:15.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 6,
        subject_id: 45,
        curriculum_id: 2,
        subject_group_id: 17,
        subject_code: 'ENGSE215',
        subject_name_th: 'ธุรกิจสตาร์อัพด้านซอฟต์แวร์',
        subject_name_en: 'Software Startup Business ',
        subject_credit: 2,
        subject_description:
          'ศึกษาเกี่ยวกับ แนวคิดเกี่ยวกับการเป็นผู้ประกอบการ แนวคิดการจัดการลักษณะเฉพาะของธุรกิจซอฟต์แวร์ การสร้างโอกาสทางธุรกิจ พฤติกรรมขององค์กร การบริหารผลตอบแทนจากการประกอบธุรกิจ การจัดการทรัพยากร การจัดการธุรกิจผลิตซอฟต์แวร์ตลาด และธุรกิจเทคโนโลยี สารสนเทศ การประเมินโครงการธุรกิจซอฟต์แวร์',
        is_deleted: 0,
        created_at: '2024-01-19T21:23:59.000+00:00',
        updated_at: '2024-01-19T21:23:59.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 45,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 17,
            subject_id: 45,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:15.000+00:00',
            updated_at: '2024-01-19T21:25:15.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 17,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาชีพบังคับ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 7,
        subject_id: 111,
        curriculum_id: 2,
        subject_group_id: 19,
        subject_code: 'ENGSE301',
        subject_name_th: 'สหกิจศึกษาด้านวิศวกรรมซอฟต์แวร์',
        subject_name_en: 'Co-operative Education in Software Engineering',
        subject_credit: 6,
        subject_description:
          'ปฏิบัติงานในสถานที่ปฏิบัติงานเสมือนเป็นพนักงานชั่วคราวเต็มเวลาของสถานที่ปฏิบัติงาน ในตำแหน่งตามที่ตรงกับวิชาชีพและเหมาะสมกับความรู้ความสามารถของนักศึกษา เพื่อเชื่อมโยงความรู้ทางทฤษฎีกับการปฏิบัติงาน ทั้งรูปแบบของงานประจำหรือโครงงาน เป็นระยะเวลาไม่น้อยกว่า 15 สัปดาห์ ปฏิบัติตนตามระเบียบการบริหารงานบุคคลของ สถานที่ปฏิบัติงานตลอดระยะเวลาการปฏิบัติงาน มีหน้าที่รับผิดชอบแน่นอน นักศึกษาต้อง รับผิดชอบงานที่ได้รับมอบหมายจากสถานประกอบการอย่างเต็มความสามารถ มีอาจารย์ นิเทศและผู้นิเทศงานทำหน้าที่ให้คำปรึกษาระหว่างปฏิบัติงาน มีการติดตามและการ ประเมินผลการปฏิบัติงานอย่างเป็นระบบ ตลอดระยะเวลาปฏิบัติงาน ทำให้นักศึกษาได้รับ ประสบการณ์จริงจากการปฏิบัติงาน เกิดการพัฒนาตนเองให้เป็นผู้มีความพร้อมในการ ทำงาน และสามารถทำงานได้ทันทีหลังสำเร็จการศึกษา หมายเหตุ : การประเมินผลนักศึกษา ให้ค่าระดับคะแนนเป็น S (Satisfactory) พ.จ. (พอใจ) และ U (Unsatisfactory) ม.จ. (ไม่พอใจ)',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:18.000+00:00',
        updated_at: '2024-01-19T21:24:18.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 111,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 19,
            subject_id: 111,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:34.000+00:00',
            updated_at: '2024-01-19T21:25:34.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 19,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาฝึกประสบการณ์วิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 8,
        subject_id: 113,
        curriculum_id: 2,
        subject_group_id: 19,
        subject_code: 'ENGSE303',
        subject_name_th: 'ฝึกประสบการณ์วิชาชีพด้านวิศวกรรมซอฟต์แวร์ 2',
        subject_name_en: 'Professional Experience in Software Engineering 2',
        subject_credit: 3,
        subject_description:
          'ฝึกประสบการณ์วิชาชีพด้านวิศวกรรมซอฟต์แวร์ในองค์การหรือหน่วยงานหรือ สถานประกอบการธุรกิจที่เหมาะสม เพื่อให้ได้รับความรู้ ทักษะ เจตคติ และประสบการณ์ในอาชีพ เป็นเวลา 1 ภาคเรียนตามที่หลักสูตรกำหนดแต่ไม่น้อยกว่า 15 สัปดาห์ โดยระหว่างการปฏิบัติงานจะมีการติดตามผล และประเมินร่วมกันระหว่างนักศึกษา อาจารย์ที่ปรึกษาและหัวหน้างาน นักศึกษา จะต้องส่งรายงานฉบับสมบูรณ์และเข้าสอบโดยการสัมมนา หมายเหตุ : การประเมินผลนักศึกษา ให้ค่าระดับคะแนนเป็น S (Satisfactory) พ.จ. (พอใจ) และ U (Unsatisfactory) ม.จ. (ไม่พอใจ)',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:18.000+00:00',
        updated_at: '2024-01-19T21:24:18.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 113,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 19,
            subject_id: 113,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:34.000+00:00',
            updated_at: '2024-01-19T21:25:34.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 19,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาฝึกประสบการณ์วิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      },
      {
        term: 8,
        subject_id: 114,
        curriculum_id: 2,
        subject_group_id: 19,
        subject_code: 'ENGSE304',
        subject_name_th: 'ปัญหาพิเศษจากสถานประกอบการ',
        subject_name_en: 'Workplace Special Problem',
        subject_credit: 3,
        subject_description:
          'การนำโจทย์ปัญหาที่ได้จากสถานประกอบการ ทั้งภาคเอกชน รัฐวิสาหกิจ รัฐบาล หรือชุมชน หรือที่นักศึกษาได้ออกทำการฝึกประสบการณ์ ทั้งในรูปแบบของการฝึกงาน ปฏิบัติงานภาคสนาม หรืออื่น ๆ เพื่อนำมาศึกษา วิเคราะห์ โดยใช้ความรู้ทางด้านวิชาชีพของนักศึกษา มาทำการประยุกต์หาวิธี การแก้ปัญหา การพัฒนาวิธีการ หรือกระบวนการ โดยจัดทำตามรูปแบบของ โครงงานหรือโครงการหรือโครงการร่วม โดยมีอาจารย์ผู้เชี่ยวชาญในสาขาวิชาให้คำแนะนำและเป็นที่ปรึกษา โดยมีส่วนร่วม จากบุคลากรของสถานประกอบการหรือชุมชนนั้น.',
        is_deleted: 0,
        created_at: '2024-01-19T21:24:18.000+00:00',
        updated_at: '2024-01-19T21:24:18.000+00:00',
        subject_structures: [
          {
            subject_structure_id: 114,
            subject_category_id: 2,
            subject_type_id: null,
            subject_group_id: 19,
            subject_id: 114,
            is_deleted: 0,
            created_at: '2024-01-19T21:25:35.000+00:00',
            updated_at: '2024-01-19T21:25:35.000+00:00',
            subjectCategory: {
              subject_category_id: 2,
              subject_category_name: 'หมวดวิชาเฉพาะ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:38.000+00:00',
              updated_at: '2024-01-19T21:23:38.000+00:00'
            },
            subjectType: null,
            subjectGroup: {
              subject_group_id: 19,
              subject_type_id: null,
              subject_group_name: 'กลุ่มวิชาฝึกประสบการณ์วิชาชีพ',
              is_deleted: 0,
              created_at: '2024-01-19T21:23:46.000+00:00',
              updated_at: '2024-01-19T21:23:46.000+00:00'
            }
          }
        ]
      }
    ]
  }
]
