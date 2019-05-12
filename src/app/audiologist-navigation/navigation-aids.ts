import { Utilities } from '../common/utlilities';
import { authorityTypes, AuthorityEnum } from '../../../api-objects/UsersObject';

/*
    If you need to add a new option to the audiologist and/or admin:
    1. Add a new item in TabsEnum
    2. Add to setupState() under the appropriate state(s) it should appear
*/
export enum TabsEnum {
    SUMMARY,
    TESTS,
    NOTES,
    SEARCH,
    ACCOUNT,
    USERS,
    QUERIES,
    SPREAD,
    SUBMIT_BTN,
    DISCARD_BTN,
    CLOSE_BTN
};
export enum StatesEnum {
    FROM_QUEST,
    AUD_NO_DATA,
    ADMIN_NO_DATA,
    LOADED_APPT
}

export class State {
    private tabAvailable: Set<TabsEnum> = new Set();
    private currentTab: TabsEnum;

    constructor() {
    }

    public tabIsAvailable(tab: TabsEnum): boolean {
        return this.tabAvailable.has(tab);
    }

    public tabIsSelected(tab: TabsEnum): boolean {
        return tab === this.currentTab;
    }

    public selectTab(tab: TabsEnum) {
        this.currentTab = tab;
    }

    /*
        loadedAppt: is there appointment data?
        fromDB: is that data from the database?
    */
    public determineState(loadedAppt: boolean, fromDB: boolean = false) {
        if(loadedAppt) {
            if(fromDB) { this.setupState(StatesEnum.LOADED_APPT); }
            else { this.setupState(StatesEnum.FROM_QUEST); }
        } else {
            if (Utilities.getSessionStorage('permissions') === authorityTypes[AuthorityEnum.Audiologist]) {
                this.setupState(StatesEnum.AUD_NO_DATA);
            } else if (Utilities.getSessionStorage('permissions') === authorityTypes[AuthorityEnum.Admin]) {
                this.setupState(StatesEnum.ADMIN_NO_DATA);
            }
        }
    }

    private setupState(state: StatesEnum) {
        this.reset();
        switch (state) {
            case StatesEnum.FROM_QUEST:
                this.tabAvailable.add(TabsEnum.SUMMARY);
                this.tabAvailable.add(TabsEnum.TESTS);
                this.tabAvailable.add(TabsEnum.NOTES);
                this.tabAvailable.add(TabsEnum.SUBMIT_BTN);
                this.tabAvailable.add(TabsEnum.DISCARD_BTN);
                this.selectTab(TabsEnum.SUMMARY);
                break;
            case StatesEnum.AUD_NO_DATA:
                this.tabAvailable.add(TabsEnum.SEARCH);
                this.tabAvailable.add(TabsEnum.ACCOUNT);
                this.selectTab(TabsEnum.SEARCH);
                break;
            case StatesEnum.ADMIN_NO_DATA:
                this.tabAvailable.add(TabsEnum.USERS);
                this.tabAvailable.add(TabsEnum.QUERIES);
                this.tabAvailable.add(TabsEnum.SPREAD);
                this.tabAvailable.add(TabsEnum.ACCOUNT);
                this.selectTab(TabsEnum.USERS);
                break;
            case StatesEnum.LOADED_APPT:
                this.tabAvailable.add(TabsEnum.SUMMARY);
                this.tabAvailable.add(TabsEnum.NOTES);
                this.tabAvailable.add(TabsEnum.SUBMIT_BTN);
                this.tabAvailable.add(TabsEnum.CLOSE_BTN);
                this.selectTab(TabsEnum.SUMMARY);
                break;
                default:
                throw new Error('No such state!');
        }
    }

    private reset() {
        this.tabAvailable.clear();
    }
}
