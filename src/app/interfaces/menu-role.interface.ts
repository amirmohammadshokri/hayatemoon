export interface IMenuRoles {
    menuRoles: IMenuRole[];
}

export interface IMenuRole {
    parent: IMenu;
    childs: IMenu[];
}

export interface IMenu {
    menuRoleId?: number;
    title?: string;
    icon?: string;
    code?: string;
    url?: string;
    saveDate?: string;
    iconMediaId?: string;
    isSelected?: boolean;
}