export class Global {
    constructor(){

    }

    getSanPhamTrongGio() : string | null{
        return localStorage.getItem("count");
    };

    getTongTien() : string | null{
        return localStorage.getItem("total");
    };
}