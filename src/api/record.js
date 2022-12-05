import httpUtil from "../utils/httpUtil";

/**
 * 记录
 */

export function findUserAllRecords(params) {
    return httpUtil.post("api/record/find_user_all_records", params);
}

export function uploadUserRecord(params) {
    return httpUtil.post("api/record/upload_user_record", params);
}

export function findUserTodayRecord(params) {
    return httpUtil.post("api/record/find_user_today_record", params);
}