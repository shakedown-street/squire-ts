"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Diablo = (function () {
    function Diablo() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.size = new Dimension2d(this.canvas.width, this.canvas.height);
        this.center = new Point2d(this.size.w / 2, this.size.h / 2);
        this.renderer = new Renderer(this.ctx);
        this.stateManager = new StateManager();
        this.stateManager.state = new TurdState();
    }
    Diablo.prototype.run = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.run();
        });
        this.renderer.clear('black', 0, 0, this.size.w, this.size.h);
        this.stateManager.update();
        this.stateManager.render(this.renderer);
    };
    return Diablo;
}());
var State = (function () {
    function State() {
    }
    return State;
}());
var TurdState = (function (_super) {
    __extends(TurdState, _super);
    function TurdState() {
        var _this = _super.call(this) || this;
        _this.stars = [];
        _this.fov = 800;
        return _this;
    }
    TurdState.prototype.random = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    TurdState.prototype.init = function () {
        for (var i = 0; i < 10000; i++) {
            this.stars.push({ point: new Point3d(this.random(-800, 800), this.random(-600, 600), this.random(-100000, 100000)), size: this.random(1, 2) });
        }
        console.log(this.stars);
    };
    TurdState.prototype.render = function (r) {
        var i = this.stars.length;
        while (i--) {
            var star = this.stars[i];
            var scale = this.fov / (this.fov + star.point.z);
            var x2d = star.point.x * scale + diablo.size.w / 2;
            var y2d = star.point.y * scale + diablo.size.h / 2;
            if (x2d >= 0 && x2d <= diablo.size.w && y2d >= 0 && y2d <= diablo.size.h) {
                r.circle('white', x2d, y2d, 1);
                star.point.z -= 1;
                if (star.point.z < -this.fov)
                    star.point.z += 2 * this.fov;
            }
        }
    };
    TurdState.prototype.update = function () {
    };
    TurdState.prototype.end = function () {
    };
    return TurdState;
}(State));
var StateManager = (function () {
    function StateManager() {
    }
    Object.defineProperty(StateManager.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this._state.init();
        },
        enumerable: true,
        configurable: true
    });
    StateManager.prototype.update = function () {
        if (!this.stateIsValid()) {
            return;
        }
        try {
            this._state.update();
        }
        catch (e) {
            console.warn(e);
        }
    };
    StateManager.prototype.render = function (r) {
        if (!this.stateIsValid()) {
            return;
        }
        try {
            this._state.render(r);
        }
        catch (e) {
            console.warn(e);
        }
    };
    StateManager.prototype.stateIsValid = function () {
        return !(this._state === undefined || this._state === null);
    };
    return StateManager;
}());
var Renderer = (function () {
    function Renderer(ctx) {
        this.ctx = ctx;
    }
    Renderer.prototype.clear = function (color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    };
    Renderer.prototype.circle = function (color, x, y, radius) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    };
    return Renderer;
}());
var Dimension2d = (function () {
    function Dimension2d(w, h) {
        this.w = w;
        this.h = h;
    }
    return Dimension2d;
}());
var Point2d = (function () {
    function Point2d(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2d;
}());
var Point3d = (function () {
    function Point3d(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point3d;
}());
var diablo = new Diablo();
window.onload = function () {
    diablo.run();
};
