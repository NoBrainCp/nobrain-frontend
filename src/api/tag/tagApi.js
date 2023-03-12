import {tag} from "../index";

export function getTags(username) {
    return tag.get(`user/${username}/tags`);
}