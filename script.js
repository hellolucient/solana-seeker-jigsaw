class JigsawPuzzle {
    constructor() {
        this.canvas = document.getElementById('puzzleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.pieces = [];
        this.selectedPiece = null;
        this.completedPieces = [];
        this.isDragging = false;
        this.currentImage = null;
        this.settings = {
            pieceCount: 56,
            background: 'light',
            rotation: false
        };
        this.snapDistance = 20;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showImageSelectModal();
    }

    setupEventListeners() {
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
        document.getElementById('closeSettings').addEventListener('click', () => this.closeSettings());
        document.getElementById('playBtn').addEventListener('click', () => this.applySettings());
        document.getElementById('newGameBtn').addEventListener('click', () => this.showImageSelectModal());
        document.getElementById('solveBtn').addEventListener('click', () => this.solvePuzzle());
        document.getElementById('previewBtn').addEventListener('click', () => this.showPreview());
        document.getElementById('closePreview').addEventListener('click', () => this.closePreview());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shufflePieces());
        document.getElementById('closeImageSelect').addEventListener('click', () => this.closeImageSelectModal());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.playAgain());

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectDifficulty(e.currentTarget));
        });

        document.querySelectorAll('.bg-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectBackground(e.currentTarget));
        });

        document.querySelectorAll('.image-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectImage(e.currentTarget));
        });

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    openSettings() {
        document.getElementById('settingsModal').classList.add('active');
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        document.getElementById(tab + 'Tab').classList.add('active');
    }

    selectDifficulty(option) {
        document.querySelectorAll('.difficulty-option').forEach(opt => opt.classList.remove('active'));
        document.querySelectorAll('.piece-count').forEach(count => count.classList.remove('highlight'));
        
        option.classList.add('active');
        option.querySelector('.piece-count').classList.add('highlight');
        this.settings.pieceCount = parseInt(option.dataset.pieces);
    }

    selectBackground(option) {
        document.querySelectorAll('.bg-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        this.settings.background = option.dataset.bg;
        
        const gameArea = document.querySelector('.game-area');
        gameArea.classList.remove('dark', 'light', 'grid');
        gameArea.classList.add(this.settings.background);
    }

    applySettings() {
        this.settings.rotation = document.getElementById('rotationToggle').checked;
        this.closeSettings();
        if (this.currentImage) {
            this.startGame(this.currentImage);
        }
    }

    showImageSelectModal() {
        document.getElementById('imageSelectModal').classList.add('active');
    }

    closeImageSelectModal() {
        document.getElementById('imageSelectModal').classList.remove('active');
    }

    selectImage(option) {
        const imageName = option.dataset.image;
        const img = new Image();
        img.src = `images/${imageName}.jpg`;
        img.onload = () => {
            this.currentImage = img;
            this.closeImageSelectModal();
            this.startGame(img);
        };
    }

    startGame(image) {
        this.currentImage = image;
        this.resizeCanvas();
        this.generatePuzzle();
        this.shufflePieces();
        this.render();
    }

    resizeCanvas() {
        const container = document.querySelector('.puzzle-container');
        const rect = container.getBoundingClientRect();
        
        const maxWidth = rect.width - 40;
        const maxHeight = rect.height - 40;
        
        if (this.currentImage) {
            const aspectRatio = this.currentImage.width / this.currentImage.height;
            
            let width = maxWidth;
            let height = width / aspectRatio;
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }
            
            this.canvas.width = width;
            this.canvas.height = height;
            
            if (this.pieces.length > 0) {
                this.render();
            }
        }
    }

    generatePuzzle() {
        this.pieces = [];
        this.completedPieces = [];
        
        const rows = Math.ceil(Math.sqrt(this.settings.pieceCount * (this.currentImage.height / this.currentImage.width)));
        const cols = Math.ceil(this.settings.pieceCount / rows);
        
        const pieceWidth = this.canvas.width / cols;
        const pieceHeight = this.canvas.height / rows;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.pieces.push({
                    id: row * cols + col,
                    correctX: col * pieceWidth,
                    correctY: row * pieceHeight,
                    currentX: col * pieceWidth,
                    currentY: row * pieceHeight,
                    width: pieceWidth,
                    height: pieceHeight,
                    sourceX: col * (this.currentImage.width / cols),
                    sourceY: row * (this.currentImage.height / rows),
                    sourceWidth: this.currentImage.width / cols,
                    sourceHeight: this.currentImage.height / rows,
                    rotation: 0,
                    isPlaced: false
                });
            }
        }
    }

    shufflePieces() {
        const padding = 20;
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        this.pieces.forEach(piece => {
            if (!piece.isPlaced) {
                piece.currentX = Math.random() * (canvasWidth - piece.width - padding * 2) + padding;
                piece.currentY = Math.random() * (canvasHeight - piece.height - padding * 2) + padding;
                
                if (this.settings.rotation) {
                    piece.rotation = Math.floor(Math.random() * 4) * 90;
                }
            }
        });
        
        this.render();
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = this.pieces.length - 1; i >= 0; i--) {
            const piece = this.pieces[i];
            if (!piece.isPlaced && this.isPieceClicked(piece, x, y)) {
                this.selectedPiece = piece;
                this.isDragging = true;
                this.offsetX = x - piece.currentX;
                this.offsetY = y - piece.currentY;
                
                this.pieces.splice(i, 1);
                this.pieces.push(piece);
                break;
            }
        }
    }

    handleMouseMove(e) {
        if (this.isDragging && this.selectedPiece) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.selectedPiece.currentX = x - this.offsetX;
            this.selectedPiece.currentY = y - this.offsetY;
            
            this.render();
        }
    }

    handleMouseUp(e) {
        if (this.selectedPiece) {
            this.snapPiece(this.selectedPiece);
            this.selectedPiece = null;
            this.isDragging = false;
            this.checkCompletion();
            this.render();
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleMouseDown({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleMouseMove({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.handleMouseUp(e);
    }

    isPieceClicked(piece, x, y) {
        return x >= piece.currentX && 
               x <= piece.currentX + piece.width &&
               y >= piece.currentY && 
               y <= piece.currentY + piece.height;
    }

    snapPiece(piece) {
        const dx = Math.abs(piece.currentX - piece.correctX);
        const dy = Math.abs(piece.currentY - piece.correctY);
        const dr = this.settings.rotation ? Math.abs(piece.rotation % 360) : 0;
        
        if (dx < this.snapDistance && dy < this.snapDistance && dr === 0) {
            piece.currentX = piece.correctX;
            piece.currentY = piece.correctY;
            piece.rotation = 0;
            piece.isPlaced = true;
            this.completedPieces.push(piece.id);
        }
    }

    checkCompletion() {
        if (this.completedPieces.length === this.pieces.length) {
            setTimeout(() => {
                document.getElementById('completionOverlay').classList.add('active');
            }, 500);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.pieces.forEach(piece => {
            this.ctx.save();
            
            this.ctx.translate(
                piece.currentX + piece.width / 2,
                piece.currentY + piece.height / 2
            );
            
            if (piece.rotation) {
                this.ctx.rotate((piece.rotation * Math.PI) / 180);
            }
            
            this.ctx.drawImage(
                this.currentImage,
                piece.sourceX,
                piece.sourceY,
                piece.sourceWidth,
                piece.sourceHeight,
                -piece.width / 2,
                -piece.height / 2,
                piece.width,
                piece.height
            );
            
            if (!piece.isPlaced) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    -piece.width / 2,
                    -piece.height / 2,
                    piece.width,
                    piece.height
                );
            }
            
            this.ctx.restore();
        });
    }

    solvePuzzle() {
        this.pieces.forEach(piece => {
            piece.currentX = piece.correctX;
            piece.currentY = piece.correctY;
            piece.rotation = 0;
            piece.isPlaced = true;
        });
        this.completedPieces = this.pieces.map(p => p.id);
        this.render();
        this.checkCompletion();
    }

    showPreview() {
        const previewImage = document.getElementById('previewImage');
        previewImage.src = this.currentImage.src;
        document.getElementById('previewModal').classList.add('active');
    }

    closePreview() {
        document.getElementById('previewModal').classList.remove('active');
    }

    playAgain() {
        document.getElementById('completionOverlay').classList.remove('active');
        this.showImageSelectModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const puzzle = new JigsawPuzzle();
});
