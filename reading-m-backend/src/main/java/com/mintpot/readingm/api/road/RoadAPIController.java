package com.mintpot.readingm.api.road;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/roadApi")
public class RoadAPIController {

    @PostMapping(value = "/callback", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @CrossOrigin
    String callback(Response response, Model model) {
        model.addAttribute("addr", response);
        return "road-callback";
    }

}
