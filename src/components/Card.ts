import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    title: string;
    description: string | string[];
    image: string;
    category: string;
    price: number;
    button: HTMLButtonElement;
    index: number;
}

export class Card extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _index: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._description = container.querySelector('.card__text');
        this._image = container.querySelector('.card__image');
        this._category = container.querySelector('.card__category');
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._button = container.querySelector('.card__button');
        this._index = container.querySelector('.basket__item-index');
        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set title(value: string) {
        this.setText(this._title, value);
    }
    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    set description(value: string | string[]) {
        this.setText(this._description, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
        if (value === 'софт-скил') {
            this._category.className = 'card__category card__category_soft';
        } else if (value === 'другое') {
            this._category.className = 'card__category card__category_other';
        } else if (value === 'дополнительное') {
            this._category.className = 'card__category card__category_additional';
        } else if (value === 'кнопка') {
            this._category.className = 'card__category card__category_button';
        } else if (value === 'хард-скил') {
            this._category.className = 'card__category card__category_hard';
        }
    }

    set price(value: number | null) {
        value === null ? this.setText(this._price, 'Бесценно') : this.setText(this._price, `${value.toString()} синапсов`);
    }

    isButtonDisabled(items: string[], id: string, price: number | null) {
        if (items.includes(id) || price === null) {
            this.setDisabled(this._button, true);
        } else {
            this.setDisabled(this._button, false);
        }
    }

    set index(value: number) {
        this.setText(this._index, value);
    }
}
