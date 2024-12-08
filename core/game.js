import {GameStatuses} from "./game-statuses";

export class Game  {
    #status = GameStatuses.SETTINGS
    #googlePosition = null

    #numberUtility;// = new ShogunNumberUtility();

    // DI/DependencyInjection
    constructor(somethingSimilarToNumberUtility) {
        this.#numberUtility = somethingSimilarToNumberUtility; // must have getRandomIntegerNumber method
    }

    #settings = {
        gridSize: {
            columnsCount: 4,
            rowsCount: 4
        },
        googleJumpInterval: 1000
    }

    /**
     * Sets the Google jump interval for the settings.
     *
     * @param {number} newValue - The new interval value to set. Must be a positive number.
     * @throws {TypeError} If newValue is not a number.
     * @throws {TypeError} If newValue is less than or equal to 0.
     */
    set googleJumpInterval(newValue) {
        if (typeof newValue !== 'number') {
            throw new TypeError('Arguments must be numbers');
        }
        if (newValue <= 0) {
            throw new TypeError('Interval must be numbers');
        }
        this.#settings.googleJumpInterval = newValue
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error('Game must be in Settings before Start')
        }
        this.#status = GameStatuses.IN_PROGRESS

        this.#makeGoogleJump();

        setInterval(() => {
            this.#makeGoogleJump();
        }, this.#settings.googleJumpInterval)
    }

    #makeGoogleJump() {
        const newPosition = {
            x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
        }
        if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
            this.#makeGoogleJump()
            return;
        }

        this.#googlePosition = newPosition
    }

    get status() {
        return this.#status
    }

    get googlePosition() {
        return this.#googlePosition
    }

    get gridSize() {
        return this.#settings.gridSize
    }

}

// antipattern GOD-object

// query, getter, selector
// action/command/setter/mutation
