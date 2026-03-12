export default class TestData {
    static makeAppointmentTestData() {
        return [
            {testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "2026-02-06"},
            {testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "2026-02-07"},
            {testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "2026-02-08"}]
    }

    static productListPayload(){
        return [
            {search_product: "Blue Top"}
        ]
    }
}