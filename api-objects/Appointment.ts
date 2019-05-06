export class Appointment {
    public appointmentid: number;
    public authorityid: number;
    public patientid: number;
    public deceased: boolean;
    public patientnotes: string;
    public appointmentdatetime: Date;
    public tympanometrytype: string;
    public otoscopytype: string;
    public rightear_lowf_severity: string;
    public rightear_highf_severity: string;
    public leftear_lowf_severity: string;
    public leftear_highf_severity: string;
    public rightear_lowf_configuration: string;
    public rightear_highf_configuration: string;
    public leftear_lowf_configuration: string;
    public leftear_highf_configuration: string;
    public audiogramtype: string;
    public username: string;
    public password: string;
    public authorityname: string;
    public authoritytype: number;
    public tfi_i: number;
    public tfi_sc: number;
    public tfi_c: number;
    public tfi_si: number;
    public tfi_a: number;
    public tfi_r: number;
    public tfi_q: number;
    public tfi_e: number;
    public tfi_overallscore: number;
    public ths_sectiona: number;
    public ths_sectionb: number;
    public ths_sectionc: number;
    public ths_sectionc_example: string;
    public ts_type: string;
}