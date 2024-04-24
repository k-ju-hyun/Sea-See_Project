package safeBeach.board.controller;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.multipart.MultipartFile;
import safeBeach.board.Service.BoardService;
import safeBeach.board.dto.Req_BoardListDto;
import safeBeach.board.dto.Req_BoardListallDto;
import safeBeach.board.dto.Req_BoardUpdateDto;
import safeBeach.board.dto.Req_BoardWriteDto;
import safeBeach.board.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;
    private static final String UPLOAD_DIR = "/Users/lee/Desktop/newProject/AI_8_32/Back-end/safeBeach/src/main/resources"; // 파일 업로드 경로

    //@RequestParam("photo") MultipartFile photo
    @PostMapping("/board/write")
    public ResponseEntity<?> boardwrite(@RequestParam("photo") MultipartFile photo,
                                        @RequestParam("categorybig") Integer categorybig,
                                        @RequestParam("categorysmall") Integer categorysmall,
                                        @RequestParam("author") String author,
                                        @RequestParam("title") String title,
                                        @RequestParam("contents") String contents,
                                        @RequestParam("location") String location,
                                        @RequestParam("restaurant") String restaurant)
    {
        System.out.println(photo);
        if (photo != null && !photo.isEmpty()) {
            try {
                String randomUUID = UUID.randomUUID().toString(); //파일 명 중복 방지
                String fileExtension = FilenameUtils.getExtension(photo.getOriginalFilename());
                String fileName = randomUUID + "." + fileExtension;
                String filePath = UPLOAD_DIR + File.separator + fileName;

                // 파일 저장
                Path targetPath = Path.of(filePath);
                Files.copy(photo.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

                // 나머지 필드와 함께 처리하는 로직
                boardService.write(categorybig,categorysmall, author, title, contents, fileName,location,restaurant);
//                boardService.write(fileName);

            } catch (IOException e) {
                e.printStackTrace();
                // 파일 저장 중에 오류가 발생한 경우 처리
                return ResponseEntity.status(500).body("Failed to save photo.");
            }
        } else {
            // 파일이 없을 경우
//            boardService.write(null);
            boardService.write(categorybig,categorysmall, author, title, contents, null,location,restaurant);
        }

        return ResponseEntity.ok().build();
    }

//    @GetMapping("/board/list")
//    public ResponseEntity<?> boardlist(@RequestBody Req_BoardListDto reqBoardListDto){
//        List<Board> board_list =boardService.boardList(reqBoardListDto.getCategorybig(),reqBoardListDto.getCategorysmall(),reqBoardListDto.getAuthor());
//        return ResponseEntity.ok(board_list);
//    }
//
//    @GetMapping("/board/listall")
//    public ResponseEntity<?> boardlistall(@RequestBody Req_BoardListallDto reqBoardListallDto){
//        List<Board> board_list =boardService.boardListAll(reqBoardListallDto.getCategorybig(),reqBoardListallDto.getAuthor());
//        return ResponseEntity.ok(board_list);
//    }
    @GetMapping("/board/list")
    public ResponseEntity<?> boardlist(@RequestParam String author, @RequestParam Integer categorybig, @RequestParam Integer categorysmall){
        List<Board> board_list =boardService.boardList(categorybig,categorysmall,author);
        return ResponseEntity.ok(board_list);
    }

    @GetMapping("/board/listall")
    public ResponseEntity<?> boardlistall(@RequestParam String author, @RequestParam Integer categorybig){
        List<Board> board_list =boardService.boardListAll(categorybig,author);
        return ResponseEntity.ok(board_list);
    }

    @GetMapping("/board/view/{id}") // localhost:8080/board/view?id=5
    public ResponseEntity<?> boardview(@PathVariable("id") Integer id){
        Board board = boardService.boardupdateview(id);
        return ResponseEntity.ok(board);
    }

    @GetMapping("/board/delete/{id}")
    public ResponseEntity<?> boarddelete(@PathVariable Integer id){
        boardService.boardDelete(id);
//        List<Board> board_list =boardService.boardList(category);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/board/update/{id}")
//    public ResponseEntity<?> boardupdate(@PathVariable("id") Integer id){
//        Board board = boardService.boardview(id);
//        return ResponseEntity.ok(board);
//    }

    @PutMapping("/board/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> boardupdate(@PathVariable("id") Integer id,
                                         @RequestBody Req_BoardUpdateDto reqBoardUpdateDto){
        boardService.boardupdate(id, reqBoardUpdateDto);
//        Board board = boardService.boardview(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/board/photo/{filename}")
    public ResponseEntity<Resource> getPhoto(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR + File.separator + filename);
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
            }else{
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("URL Error!");
        }
    }
}
